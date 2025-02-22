import { receita } from '../prismaClient';

async function criarReceita(dados) {
    return await receita.create({ data: dados });
}

async function listarReceitas() {
    return await receita.findMany({
        include: {
            usuario: { select: { nome: true, email: true } },
            avaliacoes: true,
            favoritos: true,
        },
    });
}

async function buscarReceitaPorId(id) {
    return await receita.findUnique({ 
        where: { id }, 
        include: { avaliacoes: true, favoritos: true } 
    });
}

export default { criarReceita, listarReceitas, buscarReceitaPorId };
