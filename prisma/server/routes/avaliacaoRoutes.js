// avaliacaoRoutes.js
import express from 'express';
import verifyToken from '../middleware/verifyToken';  // Importe o middleware
import { addAvaliacao, getAvaliacoes } from '../controllers/avaliacaoController';

const router = express.Router();

// Proteger a rota de adição de avaliações
router.post('/add', verifyToken, addAvaliacao);

// Rota para buscar avaliações (pode ser pública ou protegida, dependendo do seu caso)
router.get('/', getAvaliacoes);

export default router;
