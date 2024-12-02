import { Router } from "express";
import { createReservation } from "../db/queries/insert";
import { getHeadcount, getReservations } from "../db/queries/select";
import { deleteReservation } from "../db/queries/delete";
import { updateHeadcount } from "../db/queries/update";
import { reservedEventsTable } from "../db/schema";
import { db } from "../db";

export const reserveEventRoute = Router();

// GET to get all reservations
reserveEventRoute.get("", async (req, res) => {
    try {
        // Fetch items from the database
        const items = await db.select().from(reservedEventsTable);
    
        // Simplify the items if necessary to remove any complex or circular references
        const simplifiedItems = items.map(item => ({
            userId: item.userId,
            eventId: item.eventId
        }));
    
        // Send the simplified items as JSON
        res.json(simplifiedItems);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// POST to create a reservation
reserveEventRoute.post("", async (req, res) => {
    const { eventId, userId } = req.body;
    console.log(`Received request to post reservation for user ${userId} to event ${eventId}`);
    try {
        // Create Reservation
        await createReservation({eventId, userId});

        // Update Food Event headcount
        const items = await getHeadcount(eventId);
        const headcount = items[0].headcount + 1
        await updateHeadcount(eventId, headcount);

    } catch (error) {
        console.error("Error saving to the database:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// GET to get all reservations by a user
reserveEventRoute.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        // Get reservations
        const events = await getReservations(userId);
        
        // Send eventIds as json
        res.status(200).json(events);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
})

// DELETE to delete a reservation
reserveEventRoute.delete("", async (req, res) => {
    const { eventId, userId } = req.body;
    console.log(`Received request to delete reservation for user ${userId} from event ${eventId}`);
    try {
        // Remove reservation
        await deleteReservation({eventId, userId});

        // Update Food Event headcount
        const items = await getHeadcount(eventId);
        const headcount = items[0].headcount - 1
        await updateHeadcount(eventId, headcount);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
})