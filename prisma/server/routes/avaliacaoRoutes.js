import express from 'express';

const router = express.Router();

// Rota para adicionar avaliação
router.post('/', (req, res) => {
  // Lógica para adicionar avaliação
  res.json({ message: 'Avaliação adicionada com sucesso!' });
});

// Rota para listar avaliações
router.get('/', (req, res) => {
  // Lógica para listar avaliações
  res.json({ message: 'Lista de avaliações' });
});

export default router;
