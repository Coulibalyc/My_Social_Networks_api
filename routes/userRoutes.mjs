// routes/userRoutes.mjs
import express from 'express';
import { registerUser } from '../controllers/userController.mjs';

const router = express.Router();

// Route POST /api/users/register
router.post('/register', registerUser);

export default router;