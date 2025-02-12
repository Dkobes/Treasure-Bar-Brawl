import express from 'express';
const router = express.Router();
import userRoutes from './api/userroutes,js';

router.use('/users', userRoutes);

export default router;