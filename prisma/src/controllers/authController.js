import express from 'express';
import bcrypt from 'bcryptjs';
import { _user } from './prismaClient';  // Importe seu cliente Prisma aqui

const router = express.Router();

// Rota de registro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar se o e-mail já está cadastrado
    const existingUser = await _user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado!' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criar novo usuário no banco de dados
    const user = await _user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Salvar a senha criptografada
      },
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar o usuário!' });
  }
});

