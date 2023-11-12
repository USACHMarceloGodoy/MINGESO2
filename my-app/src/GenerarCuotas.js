

import React, { useState } from 'react';

function GenerarCuotas() {
  const [rut, setRut] = useState('');
  const [numCuotas, setNumCuotas] = useState(0);
  const [montoTotal, setMontoTotal] = useState(0);
  const [montoCuota, setMontoCuota] = useState(0);
  const [cuotas, setCuotas] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/generar-cuotas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rut,
            numCuotas,
            montoTotal
        })
    });
    const data = await response.json();
    setCuotas(data.cuotas);
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Rut:
          <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} />
        </label>
        <br />
        <label>
          Número de cuotas:
          <input type="number" value={numCuotas} onChange={(e) => setNumCuotas(e.target.value)} />
        </label>
        <br />
        <button type="submit">Generar cuotas</button>
      </form>
      {cuotas.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Número de cuota</th>
              <th>Fecha de vencimiento</th>
              <th>Monto a pagar</th>
            </tr>
          </thead>
          <tbody>
            {cuotas.map((cuota) => (
              <tr key={cuota.numero}>
                <td>{cuota.numero}</td>
                <td>{cuota.fechaVencimiento.toLocaleDateString()}</td>
                <td>{cuota.monto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GenerarCuotas;
