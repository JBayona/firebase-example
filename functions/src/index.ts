import * as functions from "firebase-functions";
import * as express from "express";
import { addEntry } from "./entryController";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const app = express();
app.get("/", (req, res) => res.status(200).send("Hey there!"));
// Add or Update entries into the database
app.post("/entries", addEntry);

// Server rotutes
exports.app = functions.https.onRequest(app);
