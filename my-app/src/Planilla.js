
import React, { useState } from "react";
import axios from "axios";

const Planilla = () => {
  const [rut, setRut] = useState("");
  const [estudiante, setEstudiante] = useState({});
  const [error, setError] = useState("");

  const buscarEstudiante = async () => {
    try {
      const response = await axios.get(`/api/estudiantes/${rut}`);
      setEstudiante(response.data);
      setError("");
    } catch (error) {
      setError("No se encontró un estudiante con ese RUT");
      setEstudiante({});
    }
  };

  return (
    <div>
      <h1>Planilla de Pagos</h1>
      <input
        type="text"
        placeholder="Ingrese RUT del estudiante"
        value={rut}
        onChange={(e) => setRut(e.target.value)}
      />
      <button onClick={buscarEstudiante}>Buscar</button>
      {error && <p>{error}</p>}
      {estudiante.rut && (
        <div>
          <h2>{estudiante.nombre}</h2>
          <p>RUT: {estudiante.rut}</p>
          <p>Nro. exámenes rendidos: {estudiante.numExamenes}</p>
          <p>Promedio puntaje exámenes: {estudiante.promedioPuntajes}</p>
          <p>Monto total arancel a pagar: {estudiante.montoTotal}</p>
          <p>Tipo Pago: {estudiante.tipoPago}</p>
          <p>Nro. total de cuotas pactadas: {estudiante.numCuotas}</p>
          <p>Nro. cuotas pagadas: {estudiante.numCuotasPagadas}</p>
          <p>Monto total pagado: {estudiante.montoTotalPagado}</p>
          <p>Fecha último pago: {estudiante.fechaUltimoPago}</p>
          <p>Saldo por pagar: {estudiante.saldoPorPagar}</p>
          <p>Nro. Cuotas con retraso: {estudiante.numCuotasRetraso}</p>
        </div>
      )}
    </div>
  );
};

export default Planilla;
