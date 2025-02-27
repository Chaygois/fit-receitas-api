import { Router } from 'express';
import { favoritarReceita, removerFavorito } from '../services/favoritoService';
import verifyToken from '../middlewares/verifyToken';

const router = Router();

router.post('/', verifyToken, async (req, res) => {
    const { usuarioId, receitaId } = req.body;

    if (!usuarioId || !receitaId) {
        return res.status(400).json({ error: 'Usuário e receita são obrigatórios' });
    }

    try {
        const favorito = await favoritarReceita(usuarioId, receitaId);
        res.status(201).json(favorito);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao favoritar receita', detalhes: error.message });
    }
});

router.delete('/', verifyToken, async (req, res) => {
    const { usuarioId, receitaId } = req.body;

    if (!usuarioId || !receitaId) {
        return res.status(400).json({ error: 'Usuário e receita são obrigatórios' });
    }

    try {
        await removerFavorito(usuarioId, receitaId);
        res.json({ message: 'Receita removida dos favoritos' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao remover favorito', detalhes: error.message });
    }
});

export default router;
