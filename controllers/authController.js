const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../config");

async function register(req, res) {
  try {
    const { name, email, password, phone, city } = req.body;
    const hashedPassword = await hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      city,
    });
    await user.save();

    res.json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await compare(password, user.password))) {
      return res.status(400).json({ error: "Credenciais inválidas" });
    }

    const token = sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
}

module.exports = { register, login };
