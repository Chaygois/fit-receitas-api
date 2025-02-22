import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'; // Certifique-se de que o Prisma está instalado e configurado

const prisma = new PrismaClient();
const router = express.Router();

// Rota de registro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Recebendo requisição de registro...");
  console.log("Dados recebidos:", { name, email, password });

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    // Verificar se o e-mail já existe no banco de dados
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    console.log("Usuário encontrado no banco:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado!" });
    }

    // Criptografar a senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário no banco
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("Usuário criado com sucesso:", user);

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: "Erro ao registrar o usuário!" });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log("Recebendo requisição de login...");
  console.log("Dados recebidos:", { email, password });

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios!" });
    }

    // Buscar usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("Usuário encontrado:", user);

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    // Comparar a senha recebida com a senha armazenada
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Senha correta?", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta!" });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '1h' }
    );

    console.log("Usuário autenticado com sucesso!");

    res.json({
      message: "Usuário autenticado com sucesso!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro ao autenticar o usuário!" });
  }
});

export default router;
