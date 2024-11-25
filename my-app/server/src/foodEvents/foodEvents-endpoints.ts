import { Database } from "sqlite";
import { createFoodEventServer, deleteFoodEvent, getFoodEvents, updateFoodEventHeadcount} from "./foodEvents-utils";
import { Request, Response } from 'express';

export function createFoodEventsEndpoints(app: any, db: Database) {
    // Create a new event
    app.post("/foodEvents", (req: Request, res: Response) => {

        createFoodEventServer(req, res, db);

    });

    // Delete an event
    app.delete("/foodEvents/:id", (req: Request, res: Response) => {

        deleteFoodEvent(req, res, db);

    });

    // Get all events
    app.get("/foodEvents", (req: Request, res: Response) => {

        getFoodEvents(req, res, db);

    });

    //update an event's headcount
    app.put("/foodEvents/reserve", (req: Request, res: Response) => {
        updateFoodEventHeadcount(req, res, db);
    });


}