import express from 'express';

const router = express.Router();

// Rota de registro
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  // Aqui, você pode adicionar a lógica de registro no banco de dados
  res.json({ message: 'Usuário registrado com sucesso!' });
});

// Rota de login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Aqui, você pode adicionar a lógica de autenticação do usuário
  res.json({ message: 'Usuário autenticado com sucesso!' });
});

export default router;
