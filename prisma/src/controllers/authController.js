import { hash } from 'bcrypt';
import User, { findOne } from '../models/User';

async function register(req, res) {
    const { name, email, password } = req.body;
    
    const userExists = await findOne({ email });
    if (userExists) return res.status(400).send("Email já registrado");
    
    const hashedPassword = await hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).send("Usuário registrado com sucesso!");
}
