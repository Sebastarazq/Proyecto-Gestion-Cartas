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
    res.render('crearcarta', {
      pagina: 'Crear Carta'
    });
  };

  const crearCarta = async (req, res) => {
    try {
      const formData = new FormData();
        formData.append('urlImagen', req.body.urlImagen);
        formData.append('clase', req.body.clase);
        formData.append('tipo', req.body.tipo);
        formData.append('poder', req.body.poder);
        formData.append('vida', req.body.vida);
        formData.append('defensa', req.body.defensa);
        formData.append('ataqueBase', req.body.ataqueBase);
        formData.append('ataqueDado', req.body.ataqueDado);
        formData.append('danoMax', req.body.danoMax);
        formData.append('activo', req.body.activo);
        formData.append('desc', req.body.desc);
    
      console.log('Datos enviados desde el formulario:', formData);
      const createdHero = await HeroModel.createHero(formData);
  

      console.log('Carta creada:', createdHero);

        // Agregamos un alert para mostrar un mensaje en el navegador
        res.send('<script>alert("Carta creada exitosamente!"); window.location.href = "/admin/heroes";</script>');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la carta' });
    }
};
// appController.js

  const mostrarFormularioActualizacion = async (req, res) => {
    try {
      const allHeroes = await HeroModel.getAllHeroes(); // Llama al método del modelo para obtener los héroes 
      const Id = req.params // Obtener el ID del héroe de los parámetros de la ruta
  
      res.render('actualizarcarta', {
        pagina: 'Actualizar Carta',
        hero: allHeroes // Enviar los datos del héroe a la vista
      });
    } catch (error) {
      console.error(error);
      res.render('error'); // Renderiza una vista de error en caso de problemas
    }
  };
  const actualizarCarta = async (req, res) => {


    try {
      const formData = new FormData();
        formData.append('Id', req.params);
        formData.append('urlImagen', req.body.urlImagen);
        formData.append('clase', req.body.clase);
        formData.append('tipo', req.body.tipo);
        formData.append('poder', req.body.poder);
        formData.append('vida', req.body.vida);
        formData.append('defensa', req.body.defensa);
        formData.append('ataqueBase', req.body.ataqueBase);
        formData.append('ataqueDado', req.body.ataqueDado);
        formData.append('danoMax', req.body.danoMax);
        formData.append('activo', req.body.activo);
        formData.append('desc', req.body.desc);
    
      console.log('Datos enviados desde el formulario:', formData);
      const createdHero = await HeroModel.updateHero(formData);
  

      console.log('Carta creada:', createdHero);

        // Agregamos un alert para mostrar un mensaje en el navegador
        res.send('<script>alert("Carta actualizada exitosamente!"); window.location.href = "/admin/actualizarcarta/:heroId";</script>');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la carta' });
    }
  };
  

export {
  mostrarCartas,
  mostrarFormularioCreacion,
  crearCarta,
  mostrarFormularioActualizacion,
  actualizarCarta
};
