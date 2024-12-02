import { Router } from "express";
import { createReservation } from "../db/queries/insert";
import { getReservations } from "../db/queries/select";
import { deleteReservation } from "../db/queries/delete";

export const reserveEventRoute = Router();

// POST to create a reservation
reserveEventRoute.post("", async (req, res) => {
    const { eventId, userId } = req.body;
    try {
        await createReservation({eventId, userId});
    } catch (error) {
        console.error("Error saving to the database:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// GET to get all reservations by a user
reserveEventRoute.get("", async (req, res) => {
    const { userId } = req.body;
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
    try {
        await deleteReservation({eventId, userId});
    } catch (error) {
        console.error("Error connecting to the database:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
})