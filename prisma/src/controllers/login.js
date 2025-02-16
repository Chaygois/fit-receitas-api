import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { findOne } from '../models/User';

async function login(req, res) {
    const { email, password } = req.body;

    const user = await findOne({ email });
    if (!user) return res.status(400).send("Credenciais inválidas");

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).send("Credenciais inválidas");

    const accessToken = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ accessToken, refreshToken });
}
