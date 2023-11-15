import React, { useEffect, useState } from 'react';
import api from './api';

function AgregarEstudiante() {
    const [estudiante, setEstudiante] = useState({
        rut: '',
        nombre: '',
        apellidos: '',
        añoegreso: '',
        nombre_colegio: '',
        tipo_colegio: 'Municipal',
        fecha_nacimiento: '',
    });

    useEffect(() => {
        document.title = "PreU | Agregar Estudiante";
    }, []);

    const handleChange = (e) => {
        setEstudiante({
            ...estudiante,
            [e.target.name]: e.target.value,
        });
    };

    const [mensaje, setMensaje] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('/api/estudiantes/agregar', estudiante)
            .then(response => {
                console.log(response);
                setMensaje('Estudiante agregado correctamente.');
            })
            .catch(error => {
                console.error(error);
                setMensaje('Error: No se pudo agregar este Estudiante.');
            });
    };

    return (
        <div className="container">
            <div style={{ textAlign: "center" }}>
                <h1 className="display-4">Agregar Estudiante</h1>
            </div>
            {mensaje &&
                <div className={`alert ${mensaje.startsWith('Error') ? 'alert-danger' : 'alert-success'}`} role="alert">
                    {mensaje}
                </div>
            }
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="form-group">
                        <div className="form-group">
                            <label htmlFor="rut">Rut</label>
                            <input type="text" className="form-control" id="rut" name="rut" value={estudiante.rut} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombreS">Nombres</label>
                            <input type="text" className="form-control" id="nombres" name="nombres" value={estudiante.nombres} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" className="form-control" id="apellidos" name="apellidos" value={estudiante.apellidos} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="anoegreso">Año Egreso</label>
                            <input type="text" className="form-control" id="anoegreso" name="anoegreso" value={estudiante.anoegreso} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombreColegio">Nombre Colegio</label>
                            <input type="text" className="form-control" id="nombreColegio" name="nombreColegio" value={estudiante.nombreColegio} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipoColegio">Tipo Colegio</label>
                            <select className="form-control" id="tipoColegio" name="tipoColegio" value={estudiante.tipoColegio} onChange={handleChange}>
                                <option value="Municipal">Municipal</option>
                                <option value="Subvencionado">Subvencionado</option>
                                <option value="Particular">Particular</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
                            <input type="date" className="form-control" id="fechaNacimiento" name="fechaNacimiento" value={estudiante.fechaNacimiento} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Agregar Estudiante</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AgregarEstudiante;
