import express from 'express';
import usuarioRoutes from './prisma/src/routes/usuarioRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 5000;

// Middleware para parsear o corpo da requisição como JSON
app.use(express.json());

// Usando as rotas definidas em usuarioRoutes.js
app.use('/api', usuarioRoutes);

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
