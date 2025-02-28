import express from 'express';

const router = express.Router();

// Rota de registro
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  // Lógica de registro
  res.json({ message: 'Usuário registrado com sucesso!' });
});

// Nota: A rota de login foi movida para authRoutes.js
// Não use esta rota para login, use /api/auth/login

export default router;
