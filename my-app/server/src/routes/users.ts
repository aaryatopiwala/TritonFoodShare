import { Router } from "express";
import { db } from "../db";
import { InsertUser, usersTable } from "../db/schema";
import { createUser } from "../db/queries/insert";
import { getUser, getUsername } from "../db/queries/select";

export const usersRoute = Router();

// POST route to handle form submissions
usersRoute.post("/signup", async (req, res) => {
  const userData = req.body;
  const { username, password } = userData as {
    username: InsertUser['username'],
    password: InsertUser['password']
  }

  try {
    // Check if username is taken
    const user = await getUsername(username)
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