import { Router } from 'express';
import { criarReceita, listarReceitas, buscarReceitaPorId } from '../services/receitaService';
import verifyToken from '../middlewares/verifyToken';

const router = Router();

router.post('/', verifyToken, async (req, res) => {
    try {
        const receita = await criarReceita(req.body);
        res.status(201).json(receita);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar receita', detalhes: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const receitas = await listarReceitas();
        res.json(receitas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar receitas', detalhes: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const receita = await buscarReceitaPorId(parseInt(req.params.id));
        if (!receita) return res.status(404).json({ error: 'Receita não encontrada' });
        res.json(receita);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar receita', detalhes: error.message });
    }
});

export default router;
