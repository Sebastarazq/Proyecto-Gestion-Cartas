import fetch from "node-fetch";

const apiUrl = 'http://prime.bucaramanga.upb.edu.co/api/heroes/';
const pageSize = 3;

class HeroModel {
  // Método para obtener todos los héroes
  static async getAllHeroes() {
    let pageNumber = 1;
    let allHeroes = [];

    try {
      while (true) {
        const heroesData = await this.fetchHeroes(pageNumber);

        if (heroesData.length === 0) {
          break; // Si no hay más datos, sal del bucle
        }

        allHeroes = allHeroes.concat(heroesData);
        pageNumber++;
      }

      return allHeroes;
    } catch (error) {
      throw error;
    }
  }

  // Método para llamar a la API con paginación
  static async fetchHeroes(pageNumber) {
    const url = `${apiUrl}?page_size=${pageSize}&page_number=${pageNumber}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}



export default HeroModel