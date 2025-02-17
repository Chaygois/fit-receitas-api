import { genSalt, hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { user as _user } from '../prismaClient'; // Importando a instância do Prisma

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

    // Criptografar a senha
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Criar um novo usuário no banco de dados
    const user = await _user.create({
      data: {
        name,
        email,
        password: hashedPassword // Senha criptografada
      }
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar o usuário' });
  }
};

// Função para fazer login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário existe
    const user = await _user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    // Comparar a senha
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta!' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar resposta com o token
    res.json({
      message: 'Login bem-sucedido!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno ao fazer login' });
  }
};

export default { registerUser, loginUser };
