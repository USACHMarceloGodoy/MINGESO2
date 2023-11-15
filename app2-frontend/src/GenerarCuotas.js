import React, { useState } from 'react';
import api from './api';

function GenerarCuotas() {
  const [rut, setRut] = useState('');
  const [cuotas, setCuotas] = useState(0);
  const [cuotasGeneradas, setCuotasGeneradas] = useState([]);

  const handleGenerarCuotas = async () => {
    try {
      if (!rut) {
        console.error('El valor de "rut" no puede estar vacío.');
        return;
      }

      const response = await api.post(`/api/cuotas/generarCuotas?rut=${rut}&cuotas=${cuotas}`);
      setCuotasGeneradas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label htmlFor="rut">RUT:</label>
      <input type="text" id="rut" value={rut} onChange={(e) => setRut(e.target.value)} />
      <br />
      <label htmlFor="cuotas">Cuotas:</label>
      <input type="number" id="cuotas" value={cuotas} onChange={(e) => setCuotas(e.target.value)} />
      <br />
      <button onClick={handleGenerarCuotas}>Generar cuotas</button>
      <ul>
        {cuotasGeneradas.map((cuota) => (
          <li key={cuota.id}>{cuota.descripcion}</li>
        ))}
      </ul>
    </div>
  );
}

export default GenerarCuotas;
