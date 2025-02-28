import express from 'express';
import { addFavorito, removeFavorito, getFavoritos } from '../controllers/favoritoController.js';

const router = express.Router();

router.post('/favoritos', addFavorito);
router.delete('/favoritos/:id', removeFavorito);
router.get('/favoritos', getFavoritos);

export default router;
