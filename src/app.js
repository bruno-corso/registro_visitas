import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import visitaRoutes from './routes/visitaRoutes.js'
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// usar as rotas de user
app.use("/api/users", userRoutes);

// usar as rotas de visitas
app.use("/api/visita", visitaRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[server]: Ligado em http://localhost:${PORT}`);
});
