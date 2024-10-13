import visitasModel from "../models/visitasModel.js";

export const criarVisita = async (req, res) => {
  try {
    console.log(req.body);
    
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
      visitor_name ||
      visitor_photoUrl ||
      visit_reason ||
      visit_email ||
      visit_phone ||
      visit_car_model ||
      visit_car_id ||
      checkInTime ||
      host_name ||
      host_department
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
  } catch (error) {
    res.status(500).json({ message: "erro no servidor", error });
  }
};
