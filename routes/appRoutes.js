import express from "express";
import multerMiddleware from "../middlewares/multer.js"; // Importa el middleware Multer
import { mostrarHeroes,mostrarArmaduras, crearHeroe, mostrarFormularioCreacion , mostrarFormularioActualizacion,actualizarCarta,
cambiarEstadoHeroe, mostrarFormularioCreacionArmadura, crearArmadura, mostrarFormularioActualizacionArmadura, actualizarArmadura, 
cambiarEstadoArmadura} from "../controllers/appController.js";

const router = express.Router()

// Mostrar Heroes
router.get('/admin/heroes',mostrarHeroes);

// Ruta para mostrar el formulario de creación de carta y enviarlo
router.get('/admin/crearcarta', mostrarFormularioCreacion);
router.post('/admin/crearcarta', multerMiddleware.single('urlImagen'), crearHeroe); // Utiliza el middleware Multer

// Ruta para mostrar el formulario de actualizar carta y enviarlo
router.get('/admin/actualizarcarta/:Id', mostrarFormularioActualizacion);
router.post('/admin/actualizarcarta/:Id', actualizarCarta);

// Ruta para cambiar el estado del héroe
router.put('/admin/cambiarestadoheroe/:Id', cambiarEstadoHeroe);


// Mostrar Armaduras
router.get('/admin/armaduras', mostrarArmaduras);

// Ruta para mostrar el formulario de armadura de carta y enviarlo
router.get('/admin/creararmadura', mostrarFormularioCreacionArmadura);
router.post('/admin/creararmadura', multerMiddleware.single('urlImagen'), crearArmadura); // Utiliza el middleware Multer

// Ruta para mostrar el formulario de actualizar armadura y enviarlo
router.get('/admin/actualizararmadura/:Id', mostrarFormularioActualizacionArmadura);
router.post('/admin/actualizararmadura/:Id', actualizarArmadura);

// Ruta para cambiar el estado del héroe
router.put('/admin/cambiarestadoarmadura/:Id', cambiarEstadoArmadura);


export default router;