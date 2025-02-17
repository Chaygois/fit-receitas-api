export async function login(req, res) {
    const { email, password } = req.body;
  
    try {
      // Buscar o usuário pelo email
      const user = await prisma.user.findUnique({
        where: { email }
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado!' });
      }
  
      // Comparar a senha
      const isMatch = await bcrypt.compare(password, user.password);
  
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
  }
  