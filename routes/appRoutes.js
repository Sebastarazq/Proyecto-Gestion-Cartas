import express from "express";
import { mostrarCartas, crearCarta, mostrarFormularioCreacion , mostrarFormularioActualizacion,actualizarCarta} from "../controllers/appController.js";

const router = express.Router()

// Mostrar Heroes
router.get('/admin/heroes',mostrarCartas);

// Ruta para mostrar el formulario de creación de carta y enviarlo
router.get('/admin/crearcarta', mostrarFormularioCreacion);
router.post('/admin/crearcarta', crearCarta);

// Ruta para mostrar el formulario de creación de carta y enviarlo
router.get('/admin/actualizarcarta/:Id', mostrarFormularioActualizacion);
router.patch('/admin/actualizarcarta/:Id', actualizarCarta);


export default router;