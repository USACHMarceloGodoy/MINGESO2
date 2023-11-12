
import React, { useState } from "react";
import axios from "axios";

const MostrarCuotas = () => {
  const [rut, setRut] = useState("");
  const [fees, setFees] = useState([]);

  const handleRutChange = (event) => {
    setRut(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/fees/${rut}`);
      setFees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFeePaid = async (feeId) => {
    try {
      await axios.put(`/api/fees/${feeId}/paid`);
      setFees((prevFees) =>
        prevFees.map((fee) =>
          fee.id_cuota === feeId ? { ...fee, pagado: true } : fee
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Mostrar Cuotas</h1>
      <label htmlFor="rut">RUT:</label>
      <input type="text" id="rut" value={rut} onChange={handleRutChange} />
      <button onClick={handleSearch}>Buscar</button>
      <table>
        <thead>
          <tr>
            <th>ID Cuota</th>
            <th>Fecha Inicio</th>
            <th>Fecha Vencimiento</th>
            <th>Monto</th>
            <th>Número Cuota</th>
            <th>Pagado</th>
            <th>RUT Estudiante</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.id_cuota}>
              <td>{fee.id_cuota}</td>
              <td>{fee.fecha_inicio}</td>
              <td>{fee.fecha_vencimiento}</td>
              <td>{fee.monto}</td>
              <td>{fee.numero_cuota}</td>
              <td>{fee.pagado ? "Sí" : "No"}</td>
              <td>{fee.rut_estudiante}</td>
              <td>
                {!fee.pagado && (
                  <button onClick={() => handleFeePaid(fee.id_cuota)}>
                    Marcar como pagado
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostrarCuotas;
