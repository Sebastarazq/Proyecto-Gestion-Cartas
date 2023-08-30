import express from "express";
import { mostrarCartas } from "../controllers/appController.js";

const router = express.Router()

router.get('/admin/heroes',mostrarCartas)



export default router;