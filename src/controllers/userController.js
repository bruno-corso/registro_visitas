import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "usuário já registrado" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, password: passwordHash });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ message: "usuário registrado com sucesso", token });
  } catch (err) {
    res.status(500).json({ message: "erro no servidor", err });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Usuário não encontrado" });

    const validPAsword = await bcrypt.compare(password, user.password);
    if (!validPAsword)
      return res.status(400).json({ message: "Usuário ou senha incorreto" });

    const token = generateToken(user);
    res.json({ message: "Login bem-sucediso", token });
  } catch (error) {
    res.status(500).json({ message: "erro no servidor", err });
  }
};
