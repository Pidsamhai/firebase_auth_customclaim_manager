import * as express from 'express';
import * as cors from 'cors';
import firebaseAuthGuard from './auth_guard';
import { SECRETS_KEY } from './secrets';
import * as admin from 'firebase-admin';
import { adminApp } from './firebase';
import { Template } from './template';

const server = express();

server.use(cors());

server.use(firebaseAuthGuard);

server.get("/", (_, res) => {
    res.json({
        message: "Server Alive",
        date: Date.now(),
        version: "",
        buildDate: "",
    })
});

server.get("/users/:uid", async (req, res) => {
    try {
        const templateRef = adminApp.database().ref('template');
        const templateData = await templateRef.child(req.params.uid).get();
        const decryptTemplate = new Template(templateData.toJSON()).decrypt();
        const projectAdmin = admin.initializeApp({
            credential: admin.credential.cert(decryptTemplate.credential)
        }, decryptTemplate.credential.projectId);
        const users = await projectAdmin.auth().listUsers(10);
        await projectAdmin.delete();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(404).json(error)
    }
})




server.use((_, res) => {
    res.status(404).json({ message: "Not found" });
})

console.log(SECRETS_KEY);

export default server;