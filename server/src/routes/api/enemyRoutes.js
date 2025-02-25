import express from "express";
const router = express.Router();
import { authenticateToken } from "../../middleware/auth.js";
import { getAllEnemies, getSingleEnemy, updateEnemy } from "../../controllers/enemies-controller.js";

// Endpoint to get all enemies
router.route('/').get(authenticateToken, getAllEnemies);
router.route('/:name').get(authenticateToken, getSingleEnemy).put(authenticateToken, updateEnemy);

export default router;