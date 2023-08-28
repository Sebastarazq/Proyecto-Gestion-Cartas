import { express } from "express";

//Crear la app
const app = express();

// Habilitar pug
app.set('view engine','pug') //usar pug
app.set('views','./views') // aca estaran los archivos