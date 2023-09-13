import mongoose from "mongoose";

const armaduraSchema = new mongoose.Schema({
  urlImagen: String,
  heroe: String,
  tipo: String,
  efecto: {
    case: Number,
    statEffect: Number,
    stat: String,
    target: String,
    turnCount: Number,
  },
  activo: Boolean,
  desc: String,
});

const ArmaduraModel = mongoose.model("armaduras", armaduraSchema);

export default ArmaduraModel;
