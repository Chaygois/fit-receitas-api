import jwt from "jsonwebtoken"; // Certifique-se de instalar: npm install jsonwebtoken

export default function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido ou inválido." });
    }

    const token = authHeader.split(" ")[1]; // Pega apenas o token, sem o "Bearer"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use sua chave secreta do .env
        req.user = decoded; // O token deve conter informações do usuário
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
}
