import { query } from "express";
import visitasModel from "../models/visitasModel.js";

export const criarVisita = async (req, res) => {
  try {
    // console.log(req.user);
    const {
      visitor_name,
      visitor_photoUrl,
      visit_reason,
      visit_email,
      visit_phone,
      visit_car_model,
      visit_car_id,
      checkInTime,
      checkOutTime,
      host_name,
      host_department,
    } = req.body;

    if (
      !visitor_name ||
      !visitor_photoUrl ||
      !visit_reason ||
      !visit_email ||
      !visit_phone ||
      !visit_car_model ||
      !visit_car_id ||
      !checkInTime ||
      !host_name ||
      !host_department
    )
      return res
        .status(400)
        .json({ message: "Não foi preenchido todos os campos" });

    const novaVisita = new visitasModel({
      visitor_name,
      visitor_photoUrl,
      visit_reason,
      checkInTime,
      checkOutTime,
      host_name,
      host_department,
      visit_email,
      visit_phone,
      visit_car_model,
      visit_car_id,
      user_register: req.user.name,
    });

    await novaVisita.save();
    res.status(201).json({ message: "Visita adicionada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "erro no servidor", error });
  }
};

export const verVisitas = async (req, res) => {
  try {
    // Cria o filtro a partir dos parâmetros de consulta (query params)
    const filter = [];

    // Itera sobre as chaves de req.query e adiciona ao filtro
    Object.keys(req.query).forEach((key) => {
      // Adiciona cada chave com uma busca case-insensitive usando $regex
      filter.push({ [key]: { $regex: req.query[key], $options: "i" } });
    });

    console.log(filter);
    const query = filter.length > 0 ? { $or: filter } : {};

    // Faz a busca no banco de dados usando o filtro
    const visitas = await visitasModel.find(query);

    // Se nenhuma visita for encontrada
    if (!visitas || visitas.length === 0) {
      return res.status(404).json({
        message: "Nenhuma visita encontrada",
      });
    }

    // Retorna as visitas encontradas
    res.status(200).json(visitas);
  } catch (error) {
    // Tratamento de erros com log detalhado
    console.error("Erro ao buscar visitas:", error.message);
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};

export const atualizaVisitas = async (req, res) => {
  try {
    const id = req.query.id;
    const query = await visitasModel.findOneAndUpdate(id, req.query);

    if (!query) {
      return res.status(400).json({
        message: "Não foi possível atualizar visitas",
      });
    }

    res.status(202).json(res.body);
  } catch (error) {
    res.status(500).json({ message: "erro no servidor", error });
  }
};

export const deletaVisitas = async (req, res) => {
  const a = Object.keys(req.query).length;
  // console.log(req.query);

  try {
    if (a === 0) {
      return res.status(400).json({
        message: "Envie parâmetros para deletar itens",
      });
    } else {
      // console.log("banana");

      const q = await visitasModel.deleteMany(req.query);
      if (q.deletedCount > 0) {
        res.status(202).json("Nº de itens deletados: " + q.deletedCount);
      } else {
        res.status(202).json("Nº de itens deletados: " + 0);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "erro no servidor", error });
  }
};
