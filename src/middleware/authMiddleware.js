import jsw from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso negado. Token ausente." });
  }

  try {
    const decoded = jsw.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const user = await userModel.findById(decoded.id).select("-password");
    // console.log(user);
    

    if (!user)
      return res
        .status(404)
        .json({ message: "[Middleware] Não encontrou o usuário" });

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
};
