import { genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    // Verificar se o e-mail já existe
    const userExists = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (userExists) {
      return res.status(400).json({ message: 'Email já registrado!' });
    }

    // Criptografar a senha
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Criar o usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    // Gerar token JWT
    const token = sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar resposta com o token
    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro interno ao registrar usuário' });
  }
}
