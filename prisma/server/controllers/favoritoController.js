// favoritoController.ts
import { favoritarReceita, removerFavorito, listarFavoritos } from '../services/favoritoService.js';

// Função para favoritar uma receita
export const addFavorito = async (req, res) => {
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
};

// Função para remover uma receita dos favoritos
export const removeFavorito = async (req, res) => {
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
};

// Função para listar os favoritos (essa é a função `getFavoritos`)
export const getFavoritos = async (req, res) => {
    const { usuarioId } = req.query;
    
    if (!usuarioId) {
        return res.status(400).json({ error: 'Usuário é obrigatório' });
    }
    
    try {
        const favoritos = await listarFavoritos(usuarioId); // Supondo que você tenha um serviço para isso
        res.json(favoritos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar favoritos', detalhes: error.message });
    }
};
