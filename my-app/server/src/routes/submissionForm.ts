import { Router } from "express";
import { db } from "../db";
import { submissionFormTable } from "../db/schema";
import { createSubmission } from "../db/queries/insert";


export const submissionFormRoute = Router();

submissionFormRoute.get("", async (req, res) => {
  try {
    // Fetch items from the database
    const items = await db.select().from(submissionFormTable);

    // Simplify the items if necessary to remove any complex or circular references
    const simplifiedItems = items.map(item => ({
      id: item.id,
      orgName: item.orgName,
      foodName: item.foodName,
      quantity: item.quantity,
      locationDescription: item.locationDescription,
      bigLocation: item.bigLocation,
      diet: item.diet,
    }));

    // Send the simplified items as JSON
    res.json(simplifiedItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// POST route to handle form submissions
submissionFormRoute.post("/", async (req, res) => {
  const submissionData = req.body;

  try {
    // Use the createSubmission function to insert data into the database
    await createSubmission(submissionData);

    // Respond with a success message
    res.status(200).json({ message: "Submission successful" });
  } catch (error) {
    console.error("Error saving to the database:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
