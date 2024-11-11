import { Database } from "sqlite";
import { FoodEvent } from "../types";
import { Request, Response } from "express";

export async function createFoodEventServer(req: Request, res: Response, db: Database) {

    try {
        // Type casting the request body to the expected format.
        const { id, orgName, foodName, quantity, location, description, headcount } = req.body as { 
            id: string, 
            orgName: string, 
            foodName: string, 
            quantity: string, 
            location: string, 
            description: string,
            headcount: number 
        };
 
        if (!id || !orgName || !foodName) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, orgName, foodName, quantity, location, description, headcount) VALUES (?, ?, ?, ?, ?, ?);', [id, orgName, foodName, quantity, location, description, 0]);
        res.status(201).send({ id, orgName, foodName, quantity, location, description });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Food Event could not be created, + ${error}` });
    };
 
 }

export async function deleteFoodEvent (req: Request, res: Response, db: Database) {
    // TO DO: Implement deleteExpense function
    try {
        const {id} = req.params;
        const expenses = await db.all('SELECT * FROM foodEvents WHERE id=?;', [id]);
        if (expenses.length == 0) {
            return res.status(404).send({ error: 'Food Event not found'});
        }

        await db.run('DELETE FROM foodEvents WHERE id=?;', [id])

        res.status(200).send({message: "Food Event Deleted"});
    
    } catch (error) {
        return res.status(400).send({ error: 'Food Event could not be deleted'});
    }
}

export async function getFoodEvents(req: Request, res: Response, db: Database) {
    try {
        const expenses = await db.all('SELECT * FROM foodEvents');

        res.status(200).send({ "data": expenses});
    } catch (error) {
        return res.status(400).send({ error: 'Food Events could not be retrieved'});
    }
    
}

// Utility function to update the headcount of a food event
export async function updateFoodEventHeadcount(req: Request, res: Response, db: Database) {
    const { eventId, currentHeadcount } = req.body as { 
        eventId: string, 
        currentHeadcount: number 
    };

    if (!eventId || currentHeadcount === undefined) {
        return res.status(400).send({ error: "Missing required fields: eventId or currentHeadcount" });
    }

    try {
        // Query the event to ensure it exists
        const event = await db.get('SELECT * FROM foodEvents WHERE id = ?;', [eventId]);

        if (!event) {
            return res.status(404).send({ error: "Food Event not found" });
        }

        // Update the headcount (increment or decrement based on the action)
        await db.run('UPDATE foodEvents SET headcount = ? WHERE id = ?;', [currentHeadcount, eventId]);

        res.status(200).send({ message: 'Reservation updated successfully' });
    } catch (error) {
        console.error('Error updating headcount:', error);
        return res.status(500).send({ error: 'Failed to update reservation' });
    }
}