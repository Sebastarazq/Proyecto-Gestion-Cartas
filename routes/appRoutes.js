import express from "express";
import { mostrarCartas, crearCarta, mostrarFormularioCreacion, mostrarFormularioModificacion, modificarCarta, cambiarEstadoHeroe} from "../controllers/appController.js";

const router = express.Router()

router.get('/admin/heroes',mostrarCartas);

// Ruta para mostrar el formulario de creación de cartas
router.get('/admin/crearcarta', mostrarFormularioCreacion);
router.post('/admin/crearcarta', crearCarta);

//Ruta para mostrar el formulario de modificacion de cartas
router.get('/admin/modificarcarta/:id', mostrarFormularioModificacion);
router.patch('/admin/modificarcarta/:id', modificarCarta);


export default router;