import React, { useEffect, useState } from 'react';
import api from './api';

function Cuotas() {
  const [cuotas, setCuotas] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [rutBusqueda, setRutBusqueda] = useState('');

  const handleBuscarCuotas = async () => {
    try {
      const response = await api.get('/api/cuotas/obtenerCuotasPorRut', {
        params: { rut: rutBusqueda }
      });
      setCuotas(response.data);
    } catch (error) {
      setMensaje('No se pudieron cargar las cuotas.');
    }
  };

  useEffect(() => {
    document.title = "PreU | Cuotas";
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/api/cuotas/obtenerCuotasPorRut');
      setCuotas(response.data);
    } catch (error) {
      setMensaje('No se pudieron cargar las cuotas.');
    }
  };

  const handleActualizarEstadoDePago = async (idCuota) => {
    try {
      const response = await api.post(`api/cuotas/actualizarEstadoDePago/${idCuota}`);
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <div>
      <h1 className="display-4">Lista de Cuotas</h1>
      <div>
        <label htmlFor="rutBusqueda">Buscar por RUT:</label>
        <input
          type="text"
          id="rutBusqueda"
          value={rutBusqueda}
          onChange={(e) => setRutBusqueda(e.target.value)}
        />
        <button onClick={handleBuscarCuotas}>Buscar</button>
      </div>
      {mensaje && <p className="alert alert-danger">{mensaje}</p>}
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID Cuota</th>
            <th scope="col">Fecha Inicio</th>
            <th scope="col">Fecha Vencimiento</th>
            <th scope="col">Monto</th>
            <th scope="col">Número Cuota</th>
            <th scope="col">Pagado</th>
            <th scope="col">RUT Estudiante</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cuotas.map((cuota) => (
            <tr key={cuota.id}>
              <td>{cuota.id}</td>
              <td>{cuota.fechaInicio}</td>
              <td>{cuota.fechaVencimiento}</td>
              <td>{cuota.monto}</td>
              <td>{cuota.numeroCuota}</td>
              <td>{cuota.pagado ? 'Sí' : 'No'}</td>
              <td>{cuota.rutEstudiante}</td>
              <td>
                <button onClick={() => handleActualizarEstadoDePago(cuota.id)}>
                  Actualizar Pago
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cuotas;
