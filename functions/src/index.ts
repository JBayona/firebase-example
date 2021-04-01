import * as functions from "firebase-functions";
import * as express from "express";
import {
  addEntry,
  getAllEntries,
  updateEntry,
  deleteEntry,
} from "./entryController";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const app = express();

// CRUD APIS
app.get("/", (req, res) => res.status(200).send("Hey there!"));
// Add or Update entries into the database
app.post("/entries", addEntry);
// Get all records from "entries" database
app.get("/entries", getAllEntries);
// Update a record
app.patch("/entries/:entryId", updateEntry);
// Delete a record
app.delete("/entries/:entryId", deleteEntry);

// Server rotutes
exports.app = functions.https.onRequest(app);
