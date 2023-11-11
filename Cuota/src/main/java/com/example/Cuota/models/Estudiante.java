package com.example.Cuota.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "estudiantes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Estudiante {
    @Id
    @Column(unique = true, nullable = false)
    private String rut;
    private String nombres;
    private String apellidos;
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaNacimiento;
    private String tipoColegio;
    private String nombreColegio;
    private int anoegreso;

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }
}
