import express from 'express';
const router = express.Router();
import userRoutes from './userroutes.js';
import partyRoutes from './partyRoutes.js';

router.use('/users', userRoutes);
router.use('/party', partyRoutes);

export default router;