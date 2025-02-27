import { Router } from 'express';
import { avaliarReceita, listarAvaliacoes } from '../services/avaliacaoService';
import verifyToken from '../middlewares/verifyToken';

const router = Router();

router.post('/', verifyToken, async (req, res) => {
    const { usuarioId, receitaId, nota, comentario } = req.body;

    if (!usuarioId || !receitaId || nota === undefined) {
        return res.status(400).json({ error: 'Usuário, receita e nota são obrigatórios' });
    }

    if (nota < 1 || nota > 5) {
        return res.status(400).json({ error: 'Nota deve estar entre 1 e 5' });
    }

    try {
        const avaliacao = await avaliarReceita(usuarioId, receitaId, nota, comentario);
        res.status(201).json(avaliacao);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao avaliar receita', detalhes: error.message });
    }
});

router.get('/:receitaId', async (req, res) => {
    try {
        const avaliacoes = await listarAvaliacoes(parseInt(req.params.receitaId));
        res.json(avaliacoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar avaliações', detalhes: error.message });
    }
});

export default router;
