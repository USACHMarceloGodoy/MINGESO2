import React, { useState } from 'react';

const ActualizarCuotas = () => {
  const [mensaje, setMensaje] = useState('');

  const actualizarCuotas = async () => {
    try {
      const response = await fetch('/api/actualizar-cuotas', {
        method: 'POST',
        body: JSON.stringify({
          userId: 123, // Reemplazar con el ID del usuario que se está actualizando
          numCuotas: 6 // Reemplazar con el número de cuotas que se están actualizando
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Manejar la respuesta del controlador aquí
        setMensaje('Cuotas actualizadas exitosamente');
        console.log('Cuotas actualizadas exitosamente');
      } else {
        // Manejar el caso en que la respuesta no sea exitosa
        setMensaje('Error al actualizar las cuotas');
        console.error('Error al actualizar las cuotas:', response.statusText);
      }
    } catch (error) {
      // Manejar cualquier error que ocurra durante la llamada fetch() aquí
      setMensaje('Error al actualizar las cuotas');
      console.error('Error al actualizar las cuotas:', error);
    }
  };

  return (
    <div>
      <button onClick={actualizarCuotas}>Actualizar Cuotas</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default ActualizarCuotas;
