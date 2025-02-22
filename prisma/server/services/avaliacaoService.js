import { avaliacao } from '../prismaClient';

async function avaliarReceita(usuarioId, receitaId, nota, comentario) {
    return await avaliacao.create({
        data: { usuarioId, receitaId, nota, comentario },
    });
}

async function listarAvaliacoes(receitaId) {
    return await avaliacao.findMany({ where: { receitaId } });
}

export default { avaliarReceita, listarAvaliacoes };
