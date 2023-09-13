import express from "express";
import multerMiddleware from "../middlewares/multer.js"; // Importa el middleware Multer
import { mostrarHeroes,mostrarArmaduras, crearHeroe, mostrarFormularioCreacion , mostrarFormularioActualizacion,actualizarCarta} from "../controllers/appController.js";

const router = express.Router()

// Mostrar Heroes
router.get('/admin/heroes',mostrarHeroes);
// Mostrar Armaduras
router.get('/admin/armaduras', mostrarArmaduras);


// Ruta para mostrar el formulario de creación de carta y enviarlo
router.get('/admin/crearcarta', mostrarFormularioCreacion);
router.post('/admin/crearcarta', multerMiddleware.single('urlImagen'), crearHeroe); // Utiliza el middleware Multer

// Ruta para mostrar el formulario de creación de carta y enviarlo
router.get('/admin/actualizarcarta/:Id', mostrarFormularioActualizacion);
router.patch('/admin/actualizarcarta/:Id', actualizarCarta);


export default router;