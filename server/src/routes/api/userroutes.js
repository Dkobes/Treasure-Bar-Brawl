import express from 'express';
const router = express.Router();
import {
  createUser,
  getUsers,
  getSingleUser,
  login,
} from '../../controllers/user-controller.js';

import { authenticateToken } from '../../middleware/auth.js';

router.route('/').get(authenticateToken, getUsers).post(createUser);

router.route('/:username').get(getSingleUser);

router.route('/login').post(login);

export default router;
