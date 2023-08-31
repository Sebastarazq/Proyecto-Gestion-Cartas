import HeroModel from '../models/Heroe.js';

const ITEMS_PER_PAGE = 3; // Número de elementos por página

const mostrarCartas = async (req, res) => {
  try {
    const page = req.query.page || 1; // Obtén el número de página de la consulta

    const allHeroes = await HeroModel.getAllHeroes(); // Llama al método del modelo para obtener los héroes

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentHeroes = allHeroes.slice(startIndex, endIndex);

    const totalPages = Math.ceil(allHeroes.length / ITEMS_PER_PAGE);

    res.render('cartas', {
      pagina: 'Gestion cartas',
      heroes: currentHeroes, // Pasa los datos de la página actual a la vista
      currentPage: parseInt(page),
      totalPages: totalPages
    });
  } catch (error) {
    console.error(error);
    res.render('error'); // Renderiza una vista de error en caso de problemas
  }
};

const mostrarFormularioCreacion = (req, res) => {
    res.render('crearcarta2', {
      pagina: 'Crear Carta'
    });
  };

  const crearCarta = async (req, res) => {
    try {
        const cartaData = {
            urlImagen: req.body.urlImagen,
            clase: req.body.clase,
            tipo: req.body.tipo,
            poder: req.body.poder,
            vida: req.body.vida,
            defensa: req.body.defensa,
            ataqueBase: req.body.ataqueBase,
            ataqueDado: req.body.ataqueDado,
            danoMax: req.body.danoMax,
            activo: req.body.activo,
            desc: req.body.desc
        };

        console.log('Datos enviados desde el formulario:', cartaData);
        const createdHero = await HeroModel.createHero(cartaData);

        console.log('Carta creada:', createdHero);

        // Agregamos un alert para mostrar un mensaje en el navegador
        res.send('<script>alert("Carta creada exitosamente!"); window.location.href = "/admin/heroes";</script>');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la carta' });
    }
};

const mostrarFormularioModificacion = async (req, res) => {
  try {
    const cartaId = req.params.id; // Obtén el ID de la carta desde los parámetros de la URL
    const carta = await obtenerCartaPorId(cartaId);

    if (!carta) {
      return res.status(404).json({ error: 'Carta no encontrada' });
    }

    res.render('modificarcarta', {
      pagina: 'Modificar Carta',
      carta: carta // Pasa los datos de la carta al formulario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cargar el formulario de modificación' });
  }
};

const modificarCarta = async (req, res) => {
  try {
    const cartaId = req.params.id; // Obtén el ID de la carta desde los parámetros de la URL

    const cartaData = {
      urlImagen: req.body.urlImagen,
      clase: req.body.clase,
      tipo: req.body.tipo,
      poder: req.body.poder,
      vida: req.body.vida,
      defensa: req.body.defensa,
      ataqueBase: req.body.ataqueBase,
      ataqueDado: req.body.ataqueDado,
      danoMax: req.body.danoMax,
      activo: req.body.activo,
      desc: req.body.desc
    };

    console.log('Datos enviados desde el formulario:', cartaData);
    
    const updatedCarta = await actualizarCartaPorId(cartaId, cartaData);

    console.log('Carta actualizada:', updatedCarta);

    // Agregamos un alert para mostrar un mensaje en el navegador
    res.send('<script>alert("Carta modificada exitosamente!"); window.location.href = "/admin/heroes";</script>');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al modificar la carta' });
  }
};

// appController.js

const cambiarEstadoHeroe = async (req, res) => {
    try {
      const heroId = req.params.heroId; // Obtener el ID del héroe de los parámetros de la ruta
      const nuevoEstado = req.body.activo === 'true' ? false : true;
      console.log('Cambiando estado del héroe:', heroId, nuevoEstado);
  
      // Aquí realiza la lógica para cambiar el estado del héroe usando el ID y el nuevoEstado
      // Esto puede incluir una llamada a tu modelo para actualizar el estado en la base de datos
  
      res.status(200).json({ message: 'Estado del héroe cambiado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cambiar el estado del héroe' });
    }
  };
  

export {
  mostrarCartas,
  mostrarFormularioCreacion,
  crearCarta,
  cambiarEstadoHeroe
};
