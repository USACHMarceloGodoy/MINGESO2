// Importa los componentes necesarios de React y React Router
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus componentes de la aplicación
import Header from './Header';
import Footer from './Footer';
import Actualizar from './Actualizar';
import AgregarEstudiante from './AgregarEstudiante';
import Estudiantes from './Estudiantes';
import GenerarCuotas from './GenerarCuotas';
import MostrarCuotas from './MostrarCuotas';
import Planilla from './Planilla';
import SubirNotas from './SubirNotas';

// Define tu componente principal que incluye las rutas
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path="/estudiantes/listar" element={<Estudiantes />} />
      <Route path="/estudiantes/agregar" element={<AgregarEstudiante />} />
      <Route path="/cuotas/generar" element={<GenerarCuotas />} />
      <Route path="/cuotas/mostrar" element={<MostrarCuotas />} />
      <Route path="/examen/subir" element={<SubirNotas />} />
      <Route path="/examen/planilla" element={<Planilla />} />
      <Route path="/examen/actualizar" element={<Actualizar />} />
      <Route path="/" element={<Footer />} />
    </Routes>
  </Router>
);

export default App;