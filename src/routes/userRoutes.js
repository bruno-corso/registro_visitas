import express from "express";
import {
  registerUser,
  loginUser,
  verUsers,
} from "../controllers/userController.js";

const router = express.Router();

// Rota de registro
router.post("/register", registerUser);

// Rota de Login
router.post("/login", loginUser);

// GET teste
router.get("/", verUsers);

export default router;
