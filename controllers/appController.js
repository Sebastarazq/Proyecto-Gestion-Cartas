import HeroModel from '../models/Heroe.js';
import ArmaduraModel from '../models/Armadura.js';
import ArmaModel from '../models/Arma.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Definir un usuario y contraseña de administrador
const usuarioAdmin = 'admin';
const contrasenaAdmin = 'admin123';

// Controlador para mostrar el formulario de inicio de sesión
const mostrarFormularioInicioSesion = (req, res) => {
  res.render('iniciarsesion', {
    pagina: 'Iniciar Sesion'
  });
};

// Controlador para autenticar al usuario
const autenticarUsuario = (req, res) => {
  const { usuario, contrasena } = req.body;

  // Verificar si las credenciales coinciden con el usuario y contraseña de administrador
  if (usuario === usuarioAdmin && contrasena === contrasenaAdmin) {
    // Las credenciales son válidas, genera un token JWT
    const token = jwt.sign({ usuario: usuarioAdmin }, 'gestioncartasnexubattle2omega', {
      expiresIn: '1h', // Establece la duración del token como desees
    });

    // Asigna el token JWT a las cookies
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3600000, // Duración del token en milisegundos (1 hora en este ejemplo)
      secure: false, // Cambia a true si usa HTTPS
    });

    // Redirige al usuario a la página protegida
    res.redirect('/admin/heroes');
  } else {
    // Las credenciales son inválidas, muestra un mensaje de error o redirige a la página de inicio de sesión nuevamente
    res.render('iniciarsesion', {
      pagina: 'Iniciar Sesion',
      error: 'Credenciales inválidas',
    });
  }
};


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
const mostrarArmas = async (req, res) => {
  try {
    const page = req.query.page || 1; // Obtén el número de página de la consulta
    const ITEMS_PER_PAGE = 3; // Define la cantidad de armas por página

    // Realiza una consulta a la base de datos para obtener las armas
    const allArmas = await ArmaModel.find({});

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentArmas = allArmas.slice(startIndex, endIndex);

    const totalPages = Math.ceil(allArmas.length / ITEMS_PER_PAGE);

    res.render('armas', {
      pagina: 'Gestión de Armas',
      armas: currentArmas, // Pasa los datos de la página actual a la vista
      currentPage: parseInt(page),
      totalPages: totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const mostrarFormularioCreacionArma = (req, res) => {
  res.render('creararma', {
    pagina: 'Crear Arma',
  });
};

const crearArma = async (req, res) => {
  try {
    // Obtén los datos del formulario
    const formData = req.body;
    const file = req.file; // El archivo subido

    // Construye la URL de la imagen
    const urlImagen = `http://4.246.161.219:3000/img/${file.filename}`;

    console.log('formData:', formData);
    console.log('formData.efecto:', formData.efecto);

    // Crea una nueva arma utilizando el modelo
    const newArma = new ArmaModel({
      urlImagen,
      nombre: formData.nombre,
      tipoHeroe: formData.tipoHeroe,
      efecto: {
        case: formData['efecto.case'],
        statEffect: formData['efecto.statEffect'],
        stat: formData['efecto.stat'],
        target: formData['efecto.target'],
        turnCount: formData['efecto.turnCount'],
      },
      activo: formData.activo === 'true',
      desc: formData.desc,
    });
    
    console.log('Arma creada:', newArma);
    // Guarda la nueva arma en la base de datos
    await newArma.save();

    // Redirige al usuario a otra página o muestra un mensaje de éxito
    res.send('<script>alert("Arma creada exitosamente!"); window.location.href = "/admin/armas";</script>');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el Arma' });
  }
};

const mostrarFormularioActualizacionArma = async (req, res) => {
  try {
    const idArma = req.params.Id; // Obtener el valor del parámetro :id

    console.log('ID del arma a actualizar:', idArma); // Agregar este registro para verificar el ID

    const arma = await ArmaModel.findById(idArma); // Obtener un arma por su ID

    console.log('Arma encontrada:', arma); // Agregar este registro para verificar el arma

    if (!arma) {
      // Si no se encontró el arma, puedes manejarlo adecuadamente aquí
      return res.status(404).render('error', { error: 'Arma no encontrada' });
    }

    res.render('actualizararma', {
      pagina: 'Actualizar Arma',
      arma: arma, // Enviar el arma específico a la vista
    });
  } catch (error) {
    console.error(error);
    res.render('error'); // Renderizar una vista de error en caso de problemas
  }
};
const actualizarArma = async (req, res) => {
  try {
    const idArma = req.params.Id; // Obtener el valor del parámetro :id
    const formData = req.body; // Obtener los datos del formulario

    // Obtener la URL de la imagen existente (por defecto)
    let urlImagen = formData.urlImagen;

    // Si se proporciona una nueva imagen, guarda la URL de la nueva imagen
    if (req.file) {
      // Construye la URL de la imagen actualizada
      const baseUrl = 'http://4.246.161.219:3000'; // Cambia esto según la configuración de tu servidor
      urlImagen = `${baseUrl}/img/${req.file.filename}`;
    }

    // Construye un objeto con los datos actualizados
    const updatedData = {
      urlImagen,
      nombre: formData.nombre,
      tipoHeroe: formData.tipoHeroe,
      efecto: {
        case: formData['efecto.case'],
        statEffect: formData['efecto.statEffect'],
        stat: formData['efecto.stat'],
        target: formData['efecto.target'],
        turnCount: formData['efecto.turnCount'],
      },
      activo: formData.activo === 'true',
      desc: formData.desc,
    };

    // Actualiza los datos del arma en la base de datos
    await ArmaModel.findByIdAndUpdate(idArma, updatedData);

    console.log('Arma actualizada con éxito.');

    // Agregar un script de alert después de la redirección
    res.send('<script>alert("Arma actualizada con éxito."); window.location.href = "/admin/armas/";</script>');
  } catch (error) {
    console.error(error);
    res.render('error'); // Renderiza una vista de error en caso de problemas
  }
};


const cambiarEstadoArma = async (req, res) => {
  try {
    const armaId = req.params.Id; // Obtener el ID del arma de los parámetros
    console.log('Arma ID:', armaId); // Agregar un console.log para verificar el ID

    const arma = await ArmaModel.findById(armaId);

    if (!arma) {
      return res.status(404).json({ error: 'Arma no encontrada' });
    }

    // Cambiar el estado activo del arma
    arma.activo = !arma.activo;
    console.log('Nuevo estado activo:', arma.activo); // Agregar un console.log para verificar el nuevo estado
    await arma.save();

    res.status(200).json({ message: 'Estado del arma actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cambiar el estado del arma' });
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
      const urlImagen = `http://4.246.161.219:3000/img/${file.filename}`;
  
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

//mostrar formulario creción de armaduras
const mostrarFormularioCreacionArmadura = (req, res) => {
  res.render('creararmadura', {
    pagina: 'Crear armaduras'
  });
};

const crearArmadura = async (req, res) => {
  try {
    // Obtén los datos del formulario
    const formData = req.body;
    const file = req.file; // El archivo subido

    // Construye la URL de la imagen
    const urlImagen = `http://4.246.161.219:3000/img/${file.filename}`;

    console.log('formData:', formData);
    console.log('formData.efecto:', formData.efecto);

    // Crea un nuevo héroe utilizando el modelo
    const newArmadura = new ArmaduraModel({
      urlImagen,
      heroe: formData.heroe,
      tipo: formData.tipo,
      efecto: {
        case: formData['efecto.case'],
        statEffect: formData['efecto.statEffect'],
        stat: formData['efecto.stat'],
        target: formData['efecto.target'],
        turnCount: formData['efecto.turnCount'],
      },
      activo: formData.activo === 'true',
      desc: formData.desc,
    });
    
    console.log('Armadura creada:', newArmadura);
    // Guarda la nueva armadura en la base de datos
    await newArmadura.save();

    // Redirige al usuario a otra página o muestra un mensaje de éxito
    res.send('<script>alert("Armadura creada exitosamente!"); window.location.href = "/admin/armaduras";</script>');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la Armadura' });
  }
};


const mostrarFormularioActualizacionArmadura = async (req, res) => {
  try {
    const idArmadura = req.params.Id; // Obtener el valor del parámetro :id

    console.log('ID del héroe a actualizar:', idArmadura); // Agregar este registro para verificar el ID

    const armadura = await ArmaduraModel.findById(idArmadura); // Obtener un héroe por su ID

    console.log('Héroe encontrado:', armadura); // Agregar este registro para verificar el héroe

    if (!armadura) {
      // Si no se encontró el héroe, puedes manejarlo adecuadamente aquí
      return res.status(404).render('error', { error: 'Armadura no encontrada' });
    }

    res.render('actualizararmadura', {
      pagina: 'Actualizar armadura',
      armadura: armadura, // Enviar el héroe específico a la vista
    });
  } catch (error) {
    console.error(error);
    res.render('error'); // Renderizar una vista de error en caso de problemas
  }
};

const actualizarArmadura = async (req, res) => {
  try {
    const idArmadura = req.params.Id; // Obtener el valor del parámetro :id
    const formData = req.body; // Obtener los datos del formulario

    // Buscar la carta por su ID y actualizarla con los nuevos datos del formulario, excluyendo la imagen
    await ArmaduraModel.findByIdAndUpdate(idArmadura, {
      heroe: formData.heroe,
      tipo: formData.tipo,
      efecto: {
        case: formData['efecto.case'],
        statEffect: formData['efecto.statEffect'],
        stat: formData['efecto.stat'],
        target: formData['efecto.target'],
        turnCount: formData['efecto.turnCount'],
      },
      activo: formData.activo === 'true',
      desc: formData.desc,
    });

    console.log('Carta actualizada con éxito.');

    // Agregar un script de alert después de la redirección
    res.send('<script>alert("Carta actualizada con éxito."); window.location.href = "/admin/armaduras/";</script>');
  } catch (error) {
    console.error(error);
    res.render('error'); // Renderiza una vista de error en caso de problemas
  }
};

// Controlador para cambiar el estado activo del héroe
const cambiarEstadoArmadura = async (req, res) => {
  try {
    const armaduraId = req.params.Id; // Obtener el ID del héroe de los parámetros
    console.log('Hero ID:', armaduraId); // Agregar un console.log para verificar el ID

    const armadura = await ArmaduraModel.findById(armaduraId);

    if (!armadura) {
      return res.status(404).json({ error: 'Héroe no encontrado' });
    }

    // Cambiar el estado activo de la armadura
    armadura.activo = !armadura.activo;
    console.log('Nuevo estado activo:', armadura.activo); // Agregar un console.log para verificar el nuevo estado
    await armadura.save();

    res.status(200).json({ message: 'Estado de la armadura actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cambiar el estado de la armadura' });
  }
};

export {
  mostrarFormularioInicioSesion,
  autenticarUsuario,
  mostrarHeroes,
  mostrarArmaduras,
  mostrarArmas,
  mostrarFormularioCreacionArma,
  crearArma,
  mostrarFormularioActualizacionArma,
  actualizarArma,
  cambiarEstadoArma,
  mostrarFormularioCreacion,
  crearHeroe,
  mostrarFormularioActualizacion,
  actualizarCarta,
  cambiarEstadoHeroe,
  mostrarFormularioCreacionArmadura,
  crearArmadura,
  mostrarFormularioActualizacionArmadura,
  actualizarArmadura,
  cambiarEstadoArmadura,
};
