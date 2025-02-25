import express from 'express';
const router = express.Router();
import userRoutes from './userroutes.js';
import partyRoutes from './partyRoutes.js';
import enemyRoutes from './enemyRoutes.js';

router.use('/users', userRoutes);
router.use('/party', partyRoutes);
router.use('/enemy', enemyRoutes);

export default router;