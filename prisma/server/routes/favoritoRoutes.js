// favoritoRoutes.js
import express from 'express';
import verifyToken from '../middleware/verifyToken';  // Importe o middleware
import { addFavorito, removeFavorito, getFavoritos } from '../controllers/favoritoController';

const router = express.Router();

// Proteger a rota de adição e remoção de favoritos
router.post('/add', verifyToken, addFavorito);
router.delete('/remove/:id', verifyToken, removeFavorito);

// Rota para buscar favoritos (não precisa de autenticação, caso queira permitir acesso público)
router.get('/', getFavoritos);

export default router;
