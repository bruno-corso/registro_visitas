import express from "express";
import {
  atualizaVisitas,
  criarVisita,
  deletaVisitas,
  verVisitas,
} from "../controllers/visitasController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota nova visita
router.post("/", protect, criarVisita);

// Rota ver visitas
router.get("/", protect, verVisitas);

// Rota atualiza visita
router.put("/", protect, atualizaVisitas);

// Rota deleta visitas
router.delete("/", protect, deletaVisitas);

export default router;
