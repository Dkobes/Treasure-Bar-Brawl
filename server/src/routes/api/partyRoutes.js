import express from "express";
const router = express.Router();
import { authenticateToken } from "../../middleware/auth.js";
import { getParty, levelUpParty } from "../../controllers/party-controller.js";

// Endpoint to get all party members
router.route('/').get(authenticateToken, getParty).put(authenticateToken, levelUpParty);

export default router;