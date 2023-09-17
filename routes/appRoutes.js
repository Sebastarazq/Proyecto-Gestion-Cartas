import express from "express";
import multerMiddleware from "../middlewares/multer.js"; // Importa el middleware Multer
import { jwttoken } from "../middlewares/token.js"; //importo el token
import { mostrarFormularioInicioSesion,autenticarUsuario,mostrarHeroes,mostrarArmaduras,mostrarFormularioCreacionArma, crearArma,
mostrarArmas,mostrarFormularioActualizacionArma,actualizarArma,
cambiarEstadoArma,crearHeroe, mostrarFormularioCreacion , mostrarFormularioActualizacion,actualizarCarta,
cambiarEstadoHeroe, mostrarFormularioCreacionArmadura, crearArmadura, mostrarFormularioActualizacionArmadura, actualizarArmadura, 
cambiarEstadoArmadura} from "../controllers/appController.js";

const router = express.Router()

// Ruta para mostrar el formulario de inicio de sesión
router.get('/auth/iniciosesion', mostrarFormularioInicioSesion);

// Ruta POST para procesar la autenticación
router.post('/auth/iniciosesion', autenticarUsuario);

// Mostrar Heroes
router.get('/admin/heroes',jwttoken,mostrarHeroes);

// Ruta para mostrar el formulario de creación de carta y enviarlo
router.get('/admin/crearcarta', jwttoken,mostrarFormularioCreacion);
router.post('/admin/crearcarta',jwttoken, multerMiddleware.single('urlImagen'), crearHeroe); // Utiliza el middleware Multer

// Ruta para mostrar el formulario de actualizar carta y enviarlo
router.get('/admin/actualizarcarta/:Id',jwttoken, mostrarFormularioActualizacion);
router.post('/admin/actualizarcarta/:Id',jwttoken, actualizarCarta);

// Ruta para cambiar el estado del héroe
router.put('/admin/cambiarestadoheroe/:Id',jwttoken, cambiarEstadoHeroe);


// Mostrar Armaduras
router.get('/admin/armaduras',jwttoken, mostrarArmaduras);

// Ruta para mostrar el formulario de armadura de carta y enviarlo
router.get('/admin/creararmadura',jwttoken, mostrarFormularioCreacionArmadura);
router.post('/admin/creararmadura',jwttoken, multerMiddleware.single('urlImagen'), crearArmadura); // Utiliza el middleware Multer

// Ruta para mostrar el formulario de actualizar armadura y enviarlo
router.get('/admin/actualizararmadura/:Id',jwttoken, mostrarFormularioActualizacionArmadura);
router.post('/admin/actualizararmadura/:Id',jwttoken, actualizarArmadura);

// Ruta para cambiar el estado de la armadura
router.put('/admin/cambiarestadoarmadura/:Id',jwttoken, cambiarEstadoArmadura);

// Mostrar armas
router.get('/admin/armas',jwttoken,mostrarArmas);

// Ruta para mostrar el formulario de armadura de carta y enviarlo
router.get('/admin/creararma',jwttoken, mostrarFormularioCreacionArma);
router.post('/admin/creararma',jwttoken, multerMiddleware.single('urlImagen'), crearArma); // Utiliza el middleware Multer

// Ruta para mostrar el formulario de actualizar arma y enviarlo
router.get('/admin/actualizararma/:Id',jwttoken, mostrarFormularioActualizacionArma);
router.post('/admin/actualizararma/:Id',jwttoken, actualizarArma);

// Ruta para cambiar el estado de la arma
router.put('/admin/cambiarestadoarma/:Id',jwttoken, cambiarEstadoArma);


export default router;