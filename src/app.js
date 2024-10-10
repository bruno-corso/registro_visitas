import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// usar as rotas
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[server]: Ligado em http://localhost:${PORT}`);
});
