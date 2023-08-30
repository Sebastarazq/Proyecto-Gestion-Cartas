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

export {
  mostrarCartas
};
