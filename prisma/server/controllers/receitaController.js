import { Router } from 'express';
const router = Router();
import { criarReceita, listarReceitas, buscarReceitaPorId } from '../services/receitaService';

router.post('/', async (req, res) => {
    try {
        const receita = await criarReceita(req.body);
        res.status(201).json(receita);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar receita' });
    }
});

router.get('/', async (req, res) => {
    try {
        const receitas = await listarReceitas();
        res.json(receitas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar receitas' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const receita = await buscarReceitaPorId(parseInt(req.params.id));
        if (!receita) return res.status(404).json({ error: 'Receita não encontrada' });
        res.json(receita);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar receita' });
    }
});

export default router;
