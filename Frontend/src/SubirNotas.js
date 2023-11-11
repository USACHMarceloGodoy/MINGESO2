
import React, { useState } from 'react';

function SubirNotas() {
  const [archivo, setArchivo] = useState(null);

  const handleArchivoChange = (event) => {
    const archivo = event.target.files[0];
    const lector = new FileReader();
    lector.onload = (e) => {
      const contenido = e.target.result;
      setArchivo(contenido);
    };
    lector.readAsText(archivo);
  };

  const handleSubirClick = () => {
    // Llamar al método que suba los datos del archivo CSV a la base de datos
  };

  return (
    <div>
      <form>
        <label>
          Subir archivo CSV:
          <input type="file" onChange={handleArchivoChange} />
        </label>
        <button type="submit" onClick={handleSubirClick}>
          Subir
        </button>
      </form>
      {archivo && (
        <div>
          <h2>Datos del archivo:</h2>
          <pre>{archivo}</pre>
        </div>
      )}
    </div>
  );
}

export default SubirNotas;
