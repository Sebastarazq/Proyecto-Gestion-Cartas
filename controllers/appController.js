import HeroModel from '../models/Heroe.js';
import ArmaduraModel from '../models/Armadura.js';
import mongoose from 'mongoose';


const mostrarHeroes = async (req, res) => {
  try {
    const page = req.query.page || 1; // Obtén el número de página de la consulta
    const ITEMS_PER_PAGE = 3; // Define la cantidad de héroes por página

    // Realiza una consulta a la base de datos para obtener los héroes
    const allHeroes = await HeroModel.find({});

    //console.log('Héroes recuperados de la base de datos:', allHeroes); // console.logv para verificar que me trae la consulta

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentHeroes = allHeroes.slice(startIndex, endIndex);

    const totalPages = Math.ceil(allHeroes.length / ITEMS_PER_PAGE);

    res.render('heroes', {
      pagina: 'Gestion cartas',
      heroes: currentHeroes, // Pasa los datos de la página actual a la vista
      currentPage: parseInt(page),
      totalPages: totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const mostrarArmaduras = async (req, res) => {
  try {
    const page = req.query.page || 1; // Obtén el número de página de la consulta
    const ITEMS_PER_PAGE = 3; // Define la cantidad de armaduras por página

    // Realiza una consulta a la base de datos para obtener las armaduras
    const allArmaduras = await ArmaduraModel.find(); // Esto obtendrá todas las armaduras

    //console.log("Armaduras recuperadas de la base de datos:", allArmaduras);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentArmaduras = allArmaduras.slice(startIndex, endIndex);

    const totalPages = Math.ceil(allArmaduras.length / ITEMS_PER_PAGE);

    res.render("armaduras", {
      pagina: "Gestion de armaduras",
      armaduras: currentArmaduras,
      currentPage: parseInt(page),
      totalPages: totalPages,
    });
  } catch (error) {
    console.error(error);
    res.render("error");
  }
};



const mostrarFormularioCreacion = (req, res) => {
    res.render('crearcarta', {
      pagina: 'Crear Carta'
    });
  };


  const crearHeroe = async (req, res) => {
    try {
      // Obtén los datos del formulario
      const formData = req.body;
      const file = req.file; // El archivo subido
  
      // Construye la URL de la imagen
      const urlImagen = `http://localhost:3000/img/${file.filename}`;
  
      // Genera valores aleatorios para Ataque Dado y Ataque Máximo (entre 1 y 10)
      const ataqueDado = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
      const danoMax = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
  
      // Crea un nuevo héroe utilizando el modelo
      const newHero = new HeroModel({
        urlImagen,
        clase: formData.clase,
        tipo: formData.tipo,
        poder: parseInt(formData.poder),
        vida: parseInt(formData.vida),
        defensa: parseInt(formData.defensa),
        ataqueBase: parseInt(formData.ataqueBase),
        ataqueDado,
        danoMax,
        activo: formData.activo === 'true', // Convierte el valor a booleano
        desc: formData.desc,
      });
  
      // Guarda el nuevo héroe en la base de datos
      await newHero.save();
  
      console.log('Héroe creado:', newHero);
  
      // Redirige al usuario a otra página o muestra un mensaje de éxito
      res.send('<script>alert("Héroe creado exitosamente!"); window.location.href = "/admin/heroes";</script>');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el héroe' });
    }
  };  


const mostrarFormularioActualizacion = async (req, res) => {
  try {
    const idHero = req.params.Id; // Obtener el valor del parámetro :id

    console.log('ID del héroe a actualizar:', idHero); // Agregar este registro para verificar el ID

    const hero = await HeroModel.findById(idHero); // Obtener un héroe por su ID

    console.log('Héroe encontrado:', hero); // Agregar este registro para verificar el héroe

    if (!hero) {
      // Si no se encontró el héroe, puedes manejarlo adecuadamente aquí
      return res.status(404).render('error', { error: 'Héroe no encontrado' });
    }

    res.render('actualizarcarta', {
      pagina: 'Actualizar Carta',
      hero: hero, // Enviar el héroe específico a la vista
    });
  } catch (error) {
    console.error(error);
    res.render('error'); // Renderizar una vista de error en caso de problemas
  }
};

const actualizarCarta = async (req, res) => {
  try {
    const idHero = req.params.Id; // Obtener el valor del parámetro :id
    const formData = req.body; // Obtener los datos del formulario

    // Buscar la carta por su ID y actualizarla con los nuevos datos del formulario, excluyendo la imagen
    await HeroModel.findByIdAndUpdate(idHero, {
      clase: formData.clase,
      tipo: formData.tipo,
      poder: parseInt(formData.poder),
      vida: parseInt(formData.vida),
      defensa: parseInt(formData.defensa),
      ataqueBase: parseInt(formData.ataqueBase),
      ataqueDado: parseInt(formData.ataqueDado),
      danoMax: parseInt(formData.danoMax),
      activo: formData.activo === 'true',
      desc: formData.desc,
    });

    console.log('Carta actualizada con éxito.');

    // Agregar un script de alert después de la redirección
    res.send('<script>alert("Carta actualizada con éxito."); window.location.href = "/admin/heroes/";</script>');
  } catch (error) {
    console.error(error);
    res.render('error'); // Renderiza una vista de error en caso de problemas
  }
};

// Controlador para cambiar el estado activo del héroe
const cambiarEstadoHeroe = async (req, res) => {
  try {
    const heroId = req.params.Id; // Obtener el ID del héroe de los parámetros
    console.log('Hero ID:', heroId); // Agregar un console.log para verificar el ID

    const hero = await HeroModel.findById(heroId);

    if (!hero) {
      return res.status(404).json({ error: 'Héroe no encontrado' });
    }

    // Cambiar el estado activo del héroe
    hero.activo = !hero.activo;
    console.log('Nuevo estado activo:', hero.activo); // Agregar un console.log para verificar el nuevo estado
    await hero.save();

    res.status(200).json({ message: 'Estado del héroe actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cambiar el estado del héroe' });
  }
};


export {
  mostrarHeroes,
  mostrarArmaduras,
  mostrarFormularioCreacion,
  crearHeroe,
  mostrarFormularioActualizacion,
  actualizarCarta,
  cambiarEstadoHeroe
};
