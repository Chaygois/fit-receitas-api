import { favorito } from '../prismaClient';

async function favoritarReceita(usuarioId, receitaId) {
    return await favorito.create({
        data: { usuarioId, receitaId },
    });
}

async function removerFavorito(usuarioId, receitaId) {
    return await favorito.delete({
        where: { usuarioId_receitaId: { usuarioId, receitaId } },
    });
}

export default { favoritarReceita, removerFavorito };
