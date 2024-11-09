import { Database } from "sqlite";
import { createFoodEventServer, deleteFoodEvent, getFoodEvents } from "./foodEvents-utils";
import { Request, Response } from 'express';

export function createFoodEventsEndpoints(app: any, db: Database) {
    // Create a new expense
    app.post("/foodEvents", (req: Request, res: Response) => {

        createFoodEventServer(req, res, db);

    });

    // Delete an expense
    app.delete("/foodEvents/:id", (req: Request, res: Response) => {

        deleteFoodEvent(req, res, db);

    });

    // Get all expenses
    app.get("/foodEvents", (req: Request, res: Response) => {

        getFoodEvents(req, res, db);

    });

}