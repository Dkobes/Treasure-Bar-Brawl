import Enemy from "../models/Enemies.js";

export const getAllEnemies = async (_req, res) => {
    try {
        const enemies = await Enemy.find({}); // Fetch all enemies
        res.json(enemies);
    } catch (error) {
        console.error("Error fetching enemies:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSingleEnemy = async (req, res) => {
    try {
        const enemy = await Enemy.findOne({ name: req.params.name });
        res.json(enemy);
    } catch (error) {
        console.error("Error fetching enemy:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateEnemy = async (req, res) => {
    try {
        const enemy = await Enemy.findOneAndUpdate({ name: req.params.name }, { $set: req.body }, { runValidators: true, new: true });
        res.json(enemy);
    } catch (error) {
        console.error("Error updating enemy:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}