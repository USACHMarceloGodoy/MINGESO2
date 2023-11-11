package com.example.Examen.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "cuotas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cuota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cuota", unique = true, nullable = false)
    private int id;
    private float monto;
    private Date fechaInicio;
    private Date fechaVencimiento;
    private int numeroCuota;
    private boolean pagado;
    private String rutEstudiante;
}