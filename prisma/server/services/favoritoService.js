// favoritoService.js

// Supondo que você tenha um modelo Prisma chamado "Favorito"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Função para favoritar uma receita
export const favoritarReceita = async (usuarioId, receitaId) => {
    return await prisma.favorito.create({
        data: {
            usuarioId,
            receitaId,
        },
    });
};

// Função para remover um favorito
export const removerFavorito = async (usuarioId, receitaId) => {
    return await prisma.favorito.deleteMany({
        where: {
            usuarioId,
            receitaId,
        },
    });
};

// Função para listar os favoritos de um usuário
export const listarFavoritos = async (usuarioId) => {
    return await prisma.favorito.findMany({
        where: {
            usuarioId,
        },
        include: {
            receita: true, // Supondo que você tenha uma relação com a tabela de receitas
        },
    });
};
