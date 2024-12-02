import { Response } from "express";
import 'dotenv/config';
import { foodEventsRoute } from "./routes/foodEvents";
import { usersRoute } from "./routes/users";
import { reserveEventRoute } from "./routes/reserveEvent";

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use("/foodEvents", foodEventsRoute);
app.use("/users", usersRoute);
app.use("/reserve", reserveEventRoute);

// Start the server
var server = app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    console.log(`Visit https://localhost:${port}/foodEvents to see all food events` );
    console.log(`Visit https://localhost:${port}/users to see all users` );
    console.log(`Visit https://localhost:${port}/reserve to see all reservations` );
});

module.exports = { 
    app: app,
    server: server 
};