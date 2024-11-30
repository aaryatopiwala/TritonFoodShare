import { Response } from "express";
import 'dotenv/config';
import { submissionFormRoute } from "./routes/submissionForm";
import { db } from "./db/index"

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

module.exports = { 
    app: app,
    server: server 
};