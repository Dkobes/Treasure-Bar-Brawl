import { Character, User } from "../models/index.js";

export const getParty = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }); // Fetch all characters
        const party = await Character.find({ _id: { $in: user.party } });
        res.json(party);
    } catch (error) {
        console.error("Error fetching party members:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const levelUpCharacter = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const character = await Character.findOneAndUpdate({ name: req.params.name,  _id: { $in: user.party } }, { $set: req.body }, { runValidators: true, new: true });
        res.json(character);
    } catch (error) {
        console.error("Error leveling character:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const levelUpParty = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const party = await Character.updateMany({ _id: { $in: user.party } }, { $set: req.body }, { runValidators: true, new: true });
        res.json(party);
    } catch (error) {
        console.error("Error leveling party:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}