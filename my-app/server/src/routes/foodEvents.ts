import { Router } from "express";
import { db } from "../db";
import { foodEventsTable } from "../db/schema";
import { createFoodEvent } from "../db/queries/insert";
import { deleteFoodEvent } from "../db/queries/delete";
import { updateFoodEvent } from "../db/queries/update";
import { getFoodEventsByUser } from "../db/queries/select";

export const foodEventsRoute = Router();

foodEventsRoute.get("", async (req, res) => {
  try {
    // Fetch items from the database
    const items = await db.select().from(foodEventsTable);

    // Simplify the items if necessary to remove any complex or circular references
    const simplifiedItems = items.map(item => ({
      id: item.id,
      orgName: item.orgName,
      foodName: item.foodName,
      quantity: item.quantity,
      locationDescription: item.locationDescription,
      bigLocation: item.bigLocation,
      diet: item.dietary,
      descrption: item.description,
      headcount: item.headcount,
      userId: item.userId
    }));

    // Send the simplified items as JSON
    res.json(simplifiedItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST route to handle Food Event Submissions
foodEventsRoute.post("", async (req, res) => {
  const foodEventData = req.body;
  console.log(`Received request to post food event with ID: ${foodEventData.id}`);
  try {
    // Use the createSubmission function to insert data into the database
    await createFoodEvent(foodEventData);

    // Respond with a success message
    res.status(200).json({ message: "Submission successful" });
  } catch (error) {
    console.error("Error saving to the database:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

foodEventsRoute.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Received request to delete food event with ID: ${id}`);
  try {
    await deleteFoodEvent(id);
    res.status(200).json({ message: "Food event deleted successfully" });
  } catch (error) {
    console.error("Error deleting the food event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

foodEventsRoute.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const items = await getFoodEventsByUser(userId);

    // Simplify the items if necessary to remove any complex or circular references
    const simplifiedItems = items.map(item => ({
      id: item.id,
      orgName: item.orgName,
      foodName: item.foodName,
      quantity: item.quantity,
      locationDescription: item.locationDescription,
      bigLocation: item.bigLocation,
      diet: item.dietary,
      descrption: item.description,
      headcount: item.headcount,
      userId: item.userId
    }));

    // Send the simplified items as JSON
    res.json(simplifiedItems);
    console.log("response in fetchFoodEvents", simplifiedItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

});

foodEventsRoute.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { headcount } = req.body;
  const submissionData = req.body;
  console.log(`Received request to update headcount for food event with ID: ${id}`);
  try {
    await updateFoodEvent(id, submissionData);
    res.status(200).json({ message: "Headcount updated successfully" });
  } catch (error) {
    console.error("Error updating headcount:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});