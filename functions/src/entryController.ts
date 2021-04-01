// File use this file to house all the controllers for our entry.
import { Response } from "express";
import { db } from "./config/firebase";
import * as functions from "firebase-functions";

type EntryType = {
  title: string;
  text: string;
  coverImageUrl: string;
};

type Request = {
  body: EntryType;
  params: { entryId: string };
};

// Add or edit and entry, the param entryId is used
// when we want to edit an entry
const addEntry = async (req: Request, res: Response) => {
  const { title, text } = req.body;
  try {
    // Entries insert a document into the collection if exsite
    // otherwhise creates the collection
    const entry = db.collection("entries").doc();
    const entryObject = {
      id: entry.id,
      title,
      text,
    };

    // Create or update
    entry.set(entryObject);

    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: entryObject,
    });
  } catch (error) {
    /*
    The 500 HTTP status code does not cover user input errors
    or other types of errors so we’ll need to cover those
    cases before making our database requests or use a
    middleware for that purpose.
    */
    res.status(500).json(error.message);
  }
};

// Get all entries
const getAllEntries = async (req: Request, res: Response) => {
  try {
    const allEntries: EntryType[] = [];
    const querySnapshot = await db.collection("entries").get();
    querySnapshot.forEach((doc: any) => allEntries.push(doc.data()));
    return res.status(200).json(allEntries);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Update Entry
const updateEntry = async (req: Request, res: Response) => {
  const {
    body: { text, title },
    params: { entryId },
  } = req;

  // functions.logger.info("Update request");

  try {
    const entry = db.collection("entries").doc(entryId);
    const currentData = (await entry.get()).data() || {};
    const entryObject = {
      title: title || currentData.title,
      text: text || currentData.text,
    };

    await entry.set(entryObject).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    return res.status(200).json({
      status: "success",
      message: "entry updated successfully",
      data: entryObject,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Export our functions
export { addEntry, getAllEntries, updateEntry };
