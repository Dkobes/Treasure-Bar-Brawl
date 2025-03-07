import express from "express";
const router = express.Router();
import { authenticateToken } from "../../middleware/auth.js";
import { getAllEnemies, getSingleEnemy, updateEnemy } from "../../controllers/enemies-controller.js";

router.route('/:username').get(authenticateToken, getAllEnemies);

router.route('/:username/:name').get(authenticateToken, getSingleEnemy).put(authenticateToken, updateEnemy);

export default router;