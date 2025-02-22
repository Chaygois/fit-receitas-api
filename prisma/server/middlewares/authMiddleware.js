import { verify } from 'jsonwebtoken';

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "Token não fornecido" });
    }

    // Remover o "Bearer" do token (caso seja passado assim)
    const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

    verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido ou expirado" });
        }

        req.user = decoded;
        next();
    });
}

export default verifyToken;
