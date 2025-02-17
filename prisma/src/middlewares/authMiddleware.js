import { verify } from 'jsonwebtoken';

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send("Token não fornecido");

    verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send("Token inválido ou expirado");
        req.user = user;
        next();
    });
}
