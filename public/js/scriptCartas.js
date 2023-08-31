const suspendButtons = document.querySelectorAll('.suspender');

suspendButtons.forEach(button => {
  button.addEventListener('click', async event => {
    const heroId = event.target.dataset.heroId; // Obtener el ID del héroe
    console.log('Hero ID:', heroId); // Verifica que se obtenga el ID correctamente

    try {
      const formData = new FormData();
      formData.append('activo', event.target.dataset.isActive === 'true' ? 'false' : 'true');

      const response = await fetch(`http://prime.bucaramanga.upb.edu.co/api/heroes/${heroId}`, {
        method: 'PATCH', // Usa el método PATCH para cambiar el estado del héroe
        body: formData
      });

      if (response.ok) {
        // Cambiar el estado del botón y la clase de la carta
        event.target.dataset.isActive = formData.get('activo');
        event.target.textContent = formData.get('activo') === 'true' ? 'Suspender' : 'Activar';

        const carta = event.target.closest('.carta');
        carta.classList.toggle('suspended'); // Cambiar la clase para cambiar el color
      } else {
        console.error('Error al cambiar el estado del héroe.');
      }
    } catch (error) {
      console.error(error);
    }
  });
});
