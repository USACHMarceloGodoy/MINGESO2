import React, { useEffect, useState } from 'react';
import api from './api';

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    document.title = "PreU | Estudiantes";
    const fetchData = async () => {
      try {
        const response = await api.get('/api/estudiantes/listar');
        setEstudiantes(response.data);
      } catch (error) {
        setMensaje('No se pudieron cargar los estudiantes.');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="display-4">Lista de Estudiantes</h1>
      {mensaje && <p className="alert alert-danger">{mensaje}</p>}
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Rut</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Año Egreso</th>
            <th scope="col">Colegio</th>
            <th scope="col">Tipo de colegio</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => ( // Cambiado de proveedores a estudiantes
            <tr key={estudiante.rut}>
              <td>{estudiante.rut}</td>
              <td>{estudiante.nombres}</td>
              <td>{estudiante.apellidos}</td>
              <td>{estudiante.anoegreso}</td>
              <td>{estudiante.nombreColegio}</td>
              <td>{estudiante.tipoColegio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Estudiantes;
