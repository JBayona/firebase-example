import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// Importing the Firebase admin for initializing our app and Firebase
// functions for accessing the Firebase environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
    projectId: functions.config().project.id,
    clientEmail: functions.config().client.email,
  }),
  databaseURL: "https://journal-rest-api-22035.firebaseio.com",
});

const db = admin.firestore();
export { admin, db };
