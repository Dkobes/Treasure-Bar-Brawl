import express from "express";
const router = express.Router();
import { authenticateToken } from "../../middleware/auth.js";
import { getParty, levelUpCharacter, levelUpParty } from "../../controllers/party-controller.js";

// Endpoint to get all party members
router.route('/:username').get(authenticateToken, getParty).put(authenticateToken, levelUpParty);

router.route('/:username/:name').put(authenticateToken, levelUpCharacter);

export default router;