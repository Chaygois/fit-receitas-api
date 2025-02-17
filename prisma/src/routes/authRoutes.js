import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

// Rota de registro de usuário
router.post('/register', authController.registerUser);

// Rota de login de usuário
router.post('/login', authController.loginUser);

export default router;
