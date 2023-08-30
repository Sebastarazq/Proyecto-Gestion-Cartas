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
  
      res.redirect('/admin/heroes');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la carta' });
    }
};



  
  
  

export {
  mostrarCartas,
  mostrarFormularioCreacion,
  crearCarta
};
