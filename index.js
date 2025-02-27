import express from 'express';
import dotenv from 'dotenv';
import usuarioRoutes from './prisma/server/routes/usuarioRoutes.js';  // Corrigido caminho para importar com a extensão .js
import favoritoRoutes from './prisma/server/routes/favoritoRoutes.js';  // Corrigido caminho para importar com a extensão .js
import avaliacaoRoutes from './prisma/server/routes/avaliacaoRoutes.js';  // Corrigido caminho para importar com a extensão .js
//import verifyToken from './prisma/server/middlewares/authMiddleware.js';

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());  // Middleware para parsear o corpo da requisição

// Usando as rotas
app.use('/api/usuarios', usuarioRoutes);  // Rotas de usuários
app.use('/api/favoritos', favoritoRoutes);  // Rotas de favoritos
app.use('/api/avaliacoes', avaliacaoRoutes);  // Rotas de avaliações

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
