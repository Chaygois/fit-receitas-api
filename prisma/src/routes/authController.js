// controllers/authController.js
import { user as _user } from '../prismaClient'; // Importa a instância do Prisma

// Função para criar um novo usuário
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se o usuário já existe
    const existingUser = await _user.findUnique({
      where: {
        email: email
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado!' });
    }

    // Criar um novo usuário no banco de dados
    const user = await _user.create({
      data: {
        name,
        email,
        password // Senha deve ser criptografada antes de ser salva
      }
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar o usuário' });
  }
};

export default { registerUser };
