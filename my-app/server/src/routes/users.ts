import { Router } from "express";
import { db } from "../db";
import { InsertUser, usersTable } from "../db/schema";
import { createUser } from "../db/queries/insert";
import { getUser, getUsername } from "../db/queries/select";
import { User } from "../types";

export const usersRoute = Router();

// GET route to get all users (only usernames)
usersRoute.get("", async (req, res) => {
    try {
        // Fetch items from the database
        const items = await db.select().from(usersTable);
    
        // Simplify the items if necessary to remove any complex or circular references
        const simplifiedItems = items.map(item => ({
            username: item.username
        }));
    
        // Send the simplified items as JSON
        res.json(simplifiedItems);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// POST route to handle form submissions
usersRoute.post("/signup", async (req, res) => {
    const userData: User = req.body;

    console.log(`Received request to sign up for user ${userData.username} with password ${userData.password}`);

    try {
        // Check if username is taken
        const user = await getUsername(userData.username)
        if (user.length == 1) {
            res.status(201).json({ message: "Username already taken" });
        } else {
            // Create user given data
            await createUser(userData);
            res.status(200).json({ message: "User created successfully" });
        }
    } catch (error) {
        console.error("Error saving to the database:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

usersRoute.get("/login", async (req, res) => {
    const userData = req.body;
    console.log(`Received request to login to user ${userData.username} with password ${userData.password}`);

    try {
        // Try to get user from userData
        const user = await getUser(userData);
        
        // Check if login information was correct
        if (user.length == 0) {
            res.status(201).json({ message: "Username or password incorrect" })
        } else {
            res.status(200).json({ message: "Login successful" })
        }
    } catch (error) {
        console.error("Error connecting to the database:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})