import React, { useEffect, useState } from 'react';
import api from './api';

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    document.title = "PreU | Estudiantes";
    const fetchData = async () => {
      try {
        const response = await api.get('/api/estudiantes');
        setProveedores(response.data);
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
          {proveedores.map((estudiantes) => (
            <tr key={estudiantes.rut}>
              <td>{estudiantes.rut}</td>
              <td>{estudiantes.nombres}</td>
              <td>{estudiantes.apellidos}</td>
              <td>{estudiantes.anoegreso}</td>
              <td>{estudiantes.nombre_colegio}</td>
              <td>{estudiantes.tipo_colegio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Estudiantes;