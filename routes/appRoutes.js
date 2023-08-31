import express from "express";
import { mostrarCartas, crearCarta, mostrarFormularioCreacion , cambiarEstadoHeroe} from "../controllers/appController.js";

const router = express.Router()

router.get('/admin/heroes',mostrarCartas);

// Ruta para mostrar el formulario de creación de cartas
router.get('/admin/crearcarta', mostrarFormularioCreacion);
router.post('/admin/crearcarta', crearCarta);

// Ruta para cambiar el estado del héroe (activo/suspendido)
router.post('/admin/suspender/:heroId', cambiarEstadoHeroe);


export default router;