import express from "express";
import { Character } from "../models/character.js";

const router = express.Router();

// Endpoint to get all party members
router.get("/party", async (req, res) => {
    try {
        const party = await Character.find({}); // Fetch all characters
        res.json(party);
    } catch (error) {
        console.error("Error fetching party members:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;