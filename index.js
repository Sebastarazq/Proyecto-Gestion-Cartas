import { express } from "express";
import appRoutes from './routes/appRoutes.js'

//Crear la app
const app = express();

// Habilitar pug
app.set('view engine','pug') //usar pug
app.set('views','./views') // aca estaran los archivos

// Carpeta publica
app.use(express.static('public'))


//Routing
app.use('/', appRoutes)

//Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});