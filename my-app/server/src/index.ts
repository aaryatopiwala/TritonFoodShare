import { Response } from "express";
import { createFoodEventsEndpoints } from "./foodEvents/foodEvents-endpoints";
import initDB from "./createTable";
import 'dotenv/config';
import { submissionFormRoute } from "./routes/submissionForm";


const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use("/submissionForm", submissionFormRoute);

// Start the server
var server = app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Initialize the database and start the server
(async () => {
    const db = await initDB();

    // Root endpoint to get test if the server is running
    app.get("/", (req: Request, res: Response) => {
        res.status(200).send({ "data": "Hello, TypeScript Express!" });
    });

    createFoodEventsEndpoints(app, db);
})();

module.exports = { 
    app: app,
    server: server 
};