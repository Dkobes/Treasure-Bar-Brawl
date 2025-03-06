import { Enemy, User } from "../models/index.js";

export const getAllEnemies = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }); // Fetch all enemies
        const enemies = await Enemy.find({ _id: { $in: user.enemies } });
        res.json(enemies);
    } catch (error) {
        console.error("Error fetching enemies:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSingleEnemy = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const enemy = await Enemy.findOne({ name: req.params.name, _id: { $in: user.enemies } });
        res.json(enemy);
    } catch (error) {
        console.error("Error fetching enemy:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateEnemy = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const enemy = await Enemy.findOneAndUpdate({ alias: req.params.name, _id: { $in: user.enemies } }, { $set: req.body }, { runValidators: true, new: true });
        res.json(enemy);
    } catch (error) {
        console.error("Error updating enemy:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}