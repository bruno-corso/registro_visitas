import mongoose from "mongoose";

const visitasSchema = new mongoose.Schema({
  visitor_name: {
    type: String,
    required: true,
  },
  visitor_photoUrl: {
    type: String,
    required: true,
  },
  visit_reason: {
    type: String,
    required: true,
  },
  checkInTime: {
    type: Date,
    required: true,
  },
  checkOutTime: {
    type: Date,
  },
  host_name: {
    type: String,
    required: true,
  },
  host_department: {
    type: String,
    required: true,
  },
  visit_email: {
    type: String,
    required: true,
  },
  visit_phone: {
    type: String,
  },

  visit_car_id: {
    type: String,
    required: true,
  },
  visit_car_model: {
    type: String,
    required: true,
  },

  user_register: {
    type: String,
    required: true,
  },
});

const Visita = mongoose.model("Visitas", visitasSchema);

export default Visita;
