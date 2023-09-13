import express from "express";
import multerMiddleware from "../middlewares/multer.js"; // Importa el middleware Multer
import { mostrarHeroes,mostrarArmaduras, crearHeroe, mostrarFormularioCreacion , mostrarFormularioActualizacion,actualizarCarta,
cambiarEstadoHeroe} from "../controllers/appController.js";

const router = express.Router()

// Mostrar Heroes
router.get('/admin/heroes',mostrarHeroes);
// Mostrar Armaduras
router.get('/admin/armaduras', mostrarArmaduras);


// Ruta para mostrar el formulario de creación de carta y enviarlo
router.get('/admin/crearcarta', mostrarFormularioCreacion);
router.post('/admin/crearcarta', multerMiddleware.single('urlImagen'), crearHeroe); // Utiliza el middleware Multer

// Ruta para mostrar el formulario de actualizar carta y enviarlo
router.get('/admin/actualizarcarta/:Id', mostrarFormularioActualizacion);
router.post('/admin/actualizarcarta/:Id', actualizarCarta);

// Ruta para cambiar el estado del héroe
router.put('/admin/cambiarestadoheroe/:Id', cambiarEstadoHeroe);

export default router;