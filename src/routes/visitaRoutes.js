import express from "express";
import { criarVisita, verVisitas } from "../controllers/visitasController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota nova visita
router.post("/newvisit", protect, criarVisita);

// Rota ver visitas
router.get("/", protect, verVisitas);


export default router;
