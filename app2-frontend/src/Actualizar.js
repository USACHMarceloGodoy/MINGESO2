import React from 'react';

class ActualizarCuotas extends React.Component {
  actualizarCuotas = () => {
    // Hacer una llamada fetch() a la API del controlador para actualizar las cuotas
    fetch('/api/actualizar-cuotas', {
      method: 'POST',
      body: JSON.stringify({
        userId: 123, // Reemplazar con el ID del usuario que se está actualizando
        numCuotas: 6 // Reemplazar con el número de cuotas que se están actualizando
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      // Manejar la respuesta del controlador aquí
      console.log('Cuotas actualizadas exitosamente');
    })
    .catch(error => {
      // Manejar cualquier error que ocurra durante la llamada fetch() aquí
      console.error('Error al actualizar las cuotas:', error);
    });
  };

  render() {
    return (
      <button onClick={this.actualizarCuotas}>
        Actualizar Cuotas
      </button>
    );
  }
}

export default ActualizarCuotas;
