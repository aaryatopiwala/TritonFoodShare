import { Database } from "sqlite";
import { FoodEvent } from "../types";
import { Request, Response } from "express";

export async function createFoodEventServer(req: Request, res: Response, db: Database) {

    try {
        // Type casting the request body to the expected format.
        const { id, orgName, foodName, quantity, location, description, headcount, dietary } = req.body as { 
            id: number, 
            orgName: string, 
            foodName: string, 
            quantity: string, 
            location: string, 
            description: string,
            headcount: number,
            dietary: string[]
        };
 
        if (!id || !orgName || !foodName) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, orgName, foodName, quantity, location, description, headcount, dietary) VALUES (?, ?, ?, ?, ?, ?, ?);', [id, orgName, foodName, quantity, location, description, headcount, dietary]);
        res.status(201).send({ id, orgName, foodName, quantity, location, description, headcount, dietary });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Food Event could not be created, + ${error}` });
    };
 
 }

export async function deleteFoodEvent (req: Request, res: Response, db: Database) {
    try {
        const { id } = req.params;
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
    const { id, currentHeadcount } = req.body as { 
        id: number, 
        currentHeadcount: number 
    };

    if (!id || currentHeadcount === undefined) {
        return res.status(400).send({ error: "Missing required fields: eventId or currentHeadcount" });
    }

    try {
        // Query the event to ensure it exists
        const event = await db.get('SELECT * FROM foodEvents WHERE id = ?;', [id]);

        if (!event) {
            return res.status(404).send({ error: "Food Event not found" });
        }

        // Update the headcount (increment or decrement based on the action)
        await db.run('UPDATE foodEvents SET headcount = ? WHERE id = ?;', [currentHeadcount, id]);

        res.status(200).send({ message: 'Headcount updated successfully' });
    } catch (error) {
        console.error('Error updating headcount:', error);
        return res.status(500).send({ error: 'Failed to update Headcount' });
    }
}

// 
export async function updateFoodEvent(req: Request, res: Response, db:Database) {
    const { id, orgName, foodName, quantity, location, description, headcount, dietary } = req.body as { 
        id: number, 
        orgName: string, 
        foodName: string, 
        quantity: string, 
        location: string, 
        description: string,
        headcount: number,
        dietary: string[]
    };

    if (!id === undefined) {
        return res.status(400).send({ error: "Missing required fields: eventId" });
    };

    try {
        // Query the event to ensure it exists
        const event = await db.get('SELECT * FROM foodEvents WHERE id = ?;', [id]);

        if (!event) {
            return res.status(404).send({ error: "Food Event not found" });
        }

        // Update Food Event data
        await db.run('UPDATE foodEvents SET orgName = ?, foodName = ?, quantity = ?, location = ?, description = ?, headcount = ?, dietary = ? WHERE id = ?;', [orgName, foodName, quantity, location, description, headcount, dietary, id]);

        res.status(200).send({ message: 'Food Event updated successfully' });
    } catch (error) {
        console.error('Error updating Food Event:', error);
        return res.status(500).send({ error: 'Failed to update Food Event' });
    }
}