import * as express from "express";
import * as cors from "cors";
import firebaseAuthGuard from "./auth_guard";
import {SECRETS_KEY} from "./secrets";
import * as admin from "firebase-admin";
import {adminApp} from "./firebase";
import {Template} from "./template";
import {emulatorBlock} from "./utils";
import {delayGuard} from "./delay_guard";

const server = express();

server.use(cors());
if (process.env.DEV) {
  server.use(delayGuard(2000));
}
server.use(firebaseAuthGuard);

server.get("/", (_, res) => {
  res.json({
    message: "Server Alive",
    date: Date.now(),
    version: "",
    buildDate: "",
  });
});

server.get("/users/:uid", async (req, res) => {
  try {
    const templateRef = adminApp.database().ref("template");
    const templateData = await templateRef.child(req.params.uid).get();
    const decryptTemplate = new Template(templateData.toJSON()).decrypt();
    const pageToken = req.query?.["page_token"]?.toString();
    let projectAdmin: admin.app.App;
    let usersPage: admin.auth.ListUsersResult;

    await emulatorBlock(async () => {
      projectAdmin = admin.initializeApp({
        projectId: decryptTemplate.credential.projectId,
        credential: admin.credential.cert(decryptTemplate.credential),
      }, decryptTemplate.credential.projectId);
      usersPage = await projectAdmin.auth().listUsers(1, pageToken);
      await projectAdmin.delete();
    });

    const users: Array<User> = usersPage!.users.map((u) => <User>{
      uid: u.uid,
      email: u.email,
      disable: u.disabled,
      claims: u.customClaims,
      emailVerified: u.emailVerified,
    });
    const data = {
      data: users,
      before: pageToken,
      next: usersPage!.pageToken,
    };
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});

server.get("/user/:template_id/claims/:uid", async (req, res) => {
  try {
    const templateRef = adminApp.database().ref("template");
    const templateData = await templateRef.child(req.params.template_id).get();
    const decryptTemplate = new Template(templateData.toJSON()).decrypt();
    let projectAdmin: admin.app.App;
    let userRec: admin.auth.UserRecord;
    await emulatorBlock(async () => {
      projectAdmin = admin.initializeApp({
        projectId: decryptTemplate.credential.projectId,
        credential: admin.credential.cert(decryptTemplate.credential),
      }, decryptTemplate.credential.projectId);
      userRec = await projectAdmin.auth().getUser(req.params.uid);
      await projectAdmin.delete();
    });
    res.json(userRec!.customClaims);
  } catch (error) {
    res.status(404).json({message: "Error"});
  }
});


server.use((_, res) => {
  res.status(404).json({message: "Not found"});
});

console.log(SECRETS_KEY);

export default server;
