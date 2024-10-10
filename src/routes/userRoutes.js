import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Rota de registro
router.post("/register", registerUser);

// Rota de Login
router.post("/login", loginUser);

// GET teste
router.get("/", (req, res) => {
  console.log("funcionando o GET");
  res.json({ message: "funcionando" });
});

export default router;
