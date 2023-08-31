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

  // Método para crear una nueva carta
  static async createHero(heroData) {
        try {
        console.log('Solicitud a enviar:', heroData);
    
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: heroData
        });
    
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
    
        const data = await response.text(); // Cambia a response.text() para obtener la respuesta como texto
        return data;
        } catch (error) {
        console.error('Error al crear la carta:', error);
        throw error;
        }
    }

  // Método para obtener una carta por su ID
  static async obtenerCartaPorId(cartaId) {
    try {
        const response = await fetch(`${apiUrl}/${cartaId}`);
        
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        
        const carta = await response.text(); // Cambia a response.text() para obtener la respuesta como objeto text
        return carta;
    } catch (error) {
        console.error('Error al obtener la carta:', error);
        throw error;
    }
  }

  // Método para actualizar una carta por su ID
  static async actualizarCartaPorId(cartaId, cartaData) {
    try {
        console.log('Solicitud a enviar:', cartaData);

        const response = await fetch(`${apiUrl}/${cartaId}`, {
            method: 'patch',
            body: JSON.stringify(cartaData), // Asegúrate de convertir los datos a formato JSON
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const updatedCarta = await response.text(); // Cambia a response.text() para obtener la respuesta como objeto text
        return updatedCarta;
    } catch (error) {
        console.error('Error al actualizar la carta:', error);
        throw error;
    }
  }


}  

export default HeroModel;
