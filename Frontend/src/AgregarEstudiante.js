import React, { useEffect, useState } from 'react';
import api from './api';

function AgregarEstudiante() {
    const [proveedor, setEstudiante] = useState({
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

        api.post('/api/estudiantes', estudiante)
            .then(response => {
                console.log(response);
                setMensaje('Estudiante agregado correctamente.');
            })
            .catch(error => {
                console.log(error);
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
                            <label htmlFor="nombre">Nombres</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" value={estudiante.nombre} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" className="form-control" id="apellidos" name="apellidos" value={estudiante.apellidos} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="añoegreso">Año Egreso</label>
                            <input type="text" className="form-control" id="añoegreso" name="añoegreso" value={estudiante.añoegreso} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre_colegio">Nombre Colegio</label>
                            <input type="text" className="form-control" id="nombre_colegio" name="nombre_colegio" value={estudiante.nombre_colegio} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipo_colegio">Tipo Colegio</label>
                            <select className="form-control" id="tipo_colegio" name="tipo_colegio" value={estudiante.tipo_colegio} onChange={handleChange}>
                                <option value="Municipal">Municipal</option>
                                <option value="Particular">Particular</option>
                                <option value="Particular Subvencionado">Particular Subvencionado</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha_nacimiento">Fecha Nacimiento</label>
                            <input type="date" className="form-control" id="fecha_nacimiento" name="fecha_nacimiento" value={estudiante.fecha_nacimiento} onChange={handleChange} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AgregarEstudiante;
