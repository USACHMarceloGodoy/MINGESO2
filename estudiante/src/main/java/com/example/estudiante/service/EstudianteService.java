package com.example.estudiante.service;

import com.example.estudiante.entity.Estudiante;
import com.example.estudiante.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;

@Service
public class EstudianteService {
    @Autowired
    EstudianteRepository estudianteRepository;

    public Estudiante guardarEstudiante(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    public List<Estudiante> obtenerEstudiantes() {
        return (List<Estudiante>) estudianteRepository.findAll();
    }

    public Estudiante obtenerPorRut(String rut) {
        return estudianteRepository.findByRut(rut);
    }

    public double calcularCuotas(Estudiante estudiante, int cuotas) {
        double arancel = 1500000;
        double descuento = 0;

        // Descuento al contado
        if (cuotas == 1) {
            return (arancel * 0.5);
        }

        String tipo = estudiante.getTipoColegio();

        // Descuento respecto al colegio de procedencia
        if ("Municipal".equals(tipo)) {
            descuento = 0.2;
        } else if ("Subvencionado".equals(tipo)) {
            descuento = 0.1;
        }

        // Fecha actual
        LocalDate fechaActual = LocalDate.now();
        int anoActual = fechaActual.getYear();

        // Descuento por fecha
        int anoSalida = estudiante.getAnoegreso();

        // Descuento por año
        if (anoActual - anoSalida < 1) {
            descuento = descuento + 0.15;
        } else if (anoActual - anoSalida <= 2) {
            descuento = descuento + 0.08;
        } else if (anoActual - anoSalida <= 4) {
            descuento = descuento + 0.04;
        }

        int maxCuotas = 4;

        if ("Municipal".equals(tipo)) {
            maxCuotas = 10;
        } else if ("Subvencionado".equals(tipo)) {
            maxCuotas = 7;
        }

        return (arancel * (1 - descuento)) / cuotas;
    }
}
