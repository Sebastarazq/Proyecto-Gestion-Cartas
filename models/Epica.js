import mongoose from "mongoose";

const epicaSchema = new mongoose.Schema({
  urlImagen: String,
  heroe: String,
  nombre: String,
  efectoGlobal: {
    case: Number,
    statEffect: Number,
    stat: String,
    target: String,
    turnCount: Number,
  },
  efectoHeroe: {
    case: Number,
    statEffect: Number,
    stat: String,
    target: String,
    turnCount: Number,
  },
  activo: Boolean,
  desc: String,
});

const EpicaModel = mongoose.model("epicas", epicaSchema);

export default EpicaModel;
