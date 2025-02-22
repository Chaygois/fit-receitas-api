import { Router } from 'express';
const router = Router();
import { avaliarReceita, listarAvaliacoes } from '../services/avaliacaoService';

router.post('/', async (req, res) => {
    const { usuarioId, receitaId, nota, comentario } = req.body;
    try {
        const avaliacao = await avaliarReceita(usuarioId, receitaId, nota, comentario);
        res.status(201).json(avaliacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao avaliar receita' });
    }
});

router.get('/:receitaId', async (req, res) => {
    try {
        const avaliacoes = await listarAvaliacoes(parseInt(req.params.receitaId));
        res.json(avaliacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar avaliações' });
    }
});

export default router;
