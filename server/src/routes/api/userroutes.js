import express from 'express';
const router = express.Router();
import {
  createUser,
  getUsers,
  getSingleUser,
  login,
} from '../../controllers/user-controller.js';

// import middleware
import { authenticateToken } from '../../middleware/auth.js';

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').get(authenticateToken, getUsers).post(createUser);

router.route('/:username').get(authenticateToken, getSingleUser);

router.route('/login').post(login);

export default router;
