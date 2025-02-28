import express from 'express';
import dotenv from 'dotenv';
import usuarioRoutes from './prisma/server/routes/usuarioRoutes.js';  // Corrigido caminho para importar com a extensão .js
import favoritoRoutes from './prisma/server/routes/favoritoRoutes.js';  // Corrigido caminho para importar com a extensão .js
import avaliacaoRoutes from './prisma/server/routes/avaliacaoRoutes.js';  // Corrigido caminho para importar com a extensão .js
import authRoutes from './prisma/server/routes/authRoutes.js';  // Importando as rotas de autenticação
import path from 'path';
import { fileURLToPath } from 'url';
//import verifyToken from './prisma/server/middlewares/authMiddleware.js';

dotenv.config();

// Configuração para __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());  // Middleware para parsear o corpo da requisição
app.use(express.static(path.join(__dirname, 'front-end'))); // Servir arquivos estáticos

// Usando as rotas
app.use('/api/auth', authRoutes);  // Rotas de autenticação
app.use('/api/usuarios', usuarioRoutes);  // Rotas de usuários
app.use('/api/favoritos', favoritoRoutes);  // Rotas de favoritos
app.use('/api/avaliacoes', avaliacaoRoutes);  // Rotas de avaliações

// Rota para servir a página de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end', 'login', 'login.html'));
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
