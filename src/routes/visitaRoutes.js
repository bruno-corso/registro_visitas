import express from "express";
import { criarVisita } from "../controllers/visitasController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota nova visita
router.post("/newvisit", protect, criarVisita);

export default router;
