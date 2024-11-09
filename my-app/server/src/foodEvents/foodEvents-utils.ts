import { Database } from "sqlite";
import { FoodEvent } from "../types";
import { Request, Response } from "express";

export async function createFoodEventServer(req: Request, res: Response, db: Database) {

    try {
        // Type casting the request body to the expected format.
        const { id, orgName, foodName, quantity, location, description } = req.body as { 
            id: string, 
            orgName: string, 
            foodName: string, 
            quantity: string, 
            location: string, 
            description: string 
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