export default function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }
    
    try {
      // Adapte a lógica de verificação do token conforme seu projeto
      req.user = { id: "user123" }; // Exemplo: decodificação do token
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token inválido" });
    }
  }
  