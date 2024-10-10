import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Conectado com sucesso!");
  } catch (err) {
    console.log("Erro na coneção com database: " + err);
    process.exit(1); // Forçar a aplicação a parar em caso de erro
  }
};


export default connectDB
