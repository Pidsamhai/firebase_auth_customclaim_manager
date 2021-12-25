import * as functions from "firebase-functions";
import {adminApp} from "./firebase";
import server from "./server";
import {Template} from "./template";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const api = functions.region("asia-southeast2").https.onRequest(server);

export const encryptData = functions.database.ref("/template/{id}")
    .onWrite(async (change, context) => {
      try {
        const json = change.after.toJSON();
        const template = new Template(json);
        if (template.isEncrypted) {
          console.log("Skipped");
          return;
        } else {
          console.log("Do Encrypt Data");
          const encrypeTemplate = template.encrypt();
          await adminApp.database().ref("template").child(context.params.id)
              .update(encrypeTemplate);
          return;
        }
      } catch (error) {
        if (error instanceof TypeError) {
          console.info(error);
        }
        console.log(typeof(error));
        return;
      }
    });
