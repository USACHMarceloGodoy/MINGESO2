import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">PreU</Link>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/estudiantes/Listar">Estudiantes</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/estudiantes/agregar">Agregar Estudiante</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cuotas/generar">Generar Cuota</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cuotas/mostrar">Cuotas por rut</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/examen/subir">Subir archivo</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/examen/actualizar">Actualizar</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/examen/planilla">Planillas</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;