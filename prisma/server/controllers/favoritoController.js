import { Router } from 'express';
const router = Router();
import { favoritarReceita, removerFavorito } from '../services/favoritoService';

router.post('/', async (req, res) => {
    const { usuarioId, receitaId } = req.body;
    try {
        const favorito = await favoritarReceita(usuarioId, receitaId);
        res.status(201).json(favorito);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao favoritar receita' });
    }
});

router.delete('/', async (req, res) => {
    const { usuarioId, receitaId } = req.body;
    try {
        await removerFavorito(usuarioId, receitaId);
        res.json({ message: 'Receita removida dos favoritos' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover favorito' });
    }
});

export default router;
