import React, { useState } from 'react';
import axios from 'axios';
import api from './api';

function GenerarPlantilla() {
  const [rut, setRut] = useState('');
  const [plantilla, setPlantilla] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleGenerarPlantilla = async () => {
    try {
      const response = await api.post(`/api/notas/generar-plantilla?rut=${rut}`);
      setPlantilla(response.data);  // Fix the state setter to match the response data
    } catch (error) {
      setMensaje('No se pudieron cargar la plantilla.');
    }
  };

  return (
    <div>
      <h1>Generar Plantilla</h1>
      <label htmlFor="rut">Ingrese el RUT:</label>
      <input
        type="text"
        id="rut"
        value={rut}
        onChange={(e) => setRut(e.target.value)}
      />
      <button onClick={handleGenerarPlantilla}>Generar Plantilla</button>
      {mensaje && <p>{mensaje}</p>}
      {plantilla && (
        <div>
          <h2>Información de la Plantilla</h2>
          <p>RUT: {plantilla.rut}</p>
          <p>Nombre: {plantilla.nombre}</p>
          <p>Examenes Rendidos: {plantilla.examenes_rendidos}</p>
          <p>Promedio: {plantilla.promedio}</p>
          <p>Arancel: {plantilla.arancel}</p>
          <p>Tipo de Pago: {plantilla.tipo_pago}</p>
          <p>Número de Cuotas: {plantilla.numero_cuotas}</p>
          <p>Cuotas Pagadas: {plantilla.cuotas_pagadas}</p>
          <p>Monto Pagado: {plantilla.monto_pagado}</p>
          <p>Último Pago: {plantilla.ultimo_pago}</p>
          <p>Saldo Restante: {plantilla.saldo_restante}</p>
        </div>
      )}
    </div>
  );
}

export default GenerarPlantilla;
