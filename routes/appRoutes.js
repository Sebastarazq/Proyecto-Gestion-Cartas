import express from "express";
import { mostrarCartas, crearCarta, mostrarFormularioCreacion , mostrarFormularioActualizacion,actualizarCarta} from "../controllers/appController.js";

const router = express.Router()

router.get('/admin/heroes',mostrarCartas);

// Ruta para mostrar el formulario de creación de cartas
router.get('/admin/crearcarta', mostrarFormularioCreacion);
router.post('/admin/crearcarta', crearCarta);

router.get('/admin/actualizarcarta/:Id', mostrarFormularioActualizacion);
router.patch('/admin/actualizarcarta/:Id', actualizarCarta);


export default router;