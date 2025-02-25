import { Character } from "../models/Brawlers.js";

export const getParty = async (_req, res) => {
    try {
        const party = await Character.find({}); // Fetch all characters
        res.json(party);
    } catch (error) {
        console.error("Error fetching party members:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const levelUpParty = async (req, res) => {
    try {
        const party = await Character.updateMany({}, { $set: req.body }, { runValidators: true, new: true });
        res.json(party);
    } catch (error) {
        console.error("Error leveling party:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}