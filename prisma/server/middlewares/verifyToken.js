import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

export default function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    const tokenFinal = token.split(" ")[1];

    try {
        const decoded = jwt.verify(tokenFinal, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido" });
    }
}
