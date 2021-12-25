import * as express from "express";
import * as cors from "cors";
import firebaseAuthGuard from "./auth_guard";
import {SECRETS_KEY} from "./secrets";
import * as admin from "firebase-admin";
import {adminApp} from "./firebase";
import {Template} from "./template";

const server = express();

server.use(cors());

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

    /**
     * Delete main emulator host
     * before do process
     */
    delete process.env.FIREBASE_AUTH_EMULATOR_HOST;
    process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9089";

    const projectAdmin = admin.initializeApp({
      projectId: decryptTemplate.credential.projectId,
      credential: admin.credential.cert(decryptTemplate.credential),
    }, decryptTemplate.credential.projectId);
    const users = await projectAdmin.auth().listUsers(10);
    await projectAdmin.delete();

    /**
     * Roll back main emulator host
     */
    process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});


server.use((_, res) => {
  res.status(404).json({message: "Not found"});
});

console.log(SECRETS_KEY);

export default server;
