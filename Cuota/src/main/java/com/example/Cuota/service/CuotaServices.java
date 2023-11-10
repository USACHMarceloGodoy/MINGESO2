package com.example.Cuota.service;

import com.example.Cuota.entity.Cuota;
import com.example.Cuota.models.Estudiante;
import com.example.Cuota.repository.CuotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class CuotaServices {
    @Autowired
    CuotaRepository cuotaRepository;
    @Autowired
    RestTemplate restTemplate;

    public Estudiante obtenerEstudiante(String rut) {
        String url = "http://localhost:8081/estudiantes/buscar/" + rut;
        Estudiante estudiante = restTemplate.getForObject(url, Estudiante.class);
        return estudiante;
    }

    public Cuota guardarCuota(Cuota cuota) {
        return cuotaRepository.save(cuota);
    }

    public List<Cuota> obtenerCuotas() {
        return (List<Cuota>) cuotaRepository.findAll();
    }

    public List<Cuota> obtenerCuotasPorRut(String rut) {
        return cuotaRepository.findByRut(rut);
    }

    @Transactional
    public void actualizarEstadoDePago(int idCuota) {
        cuotaRepository.actualizarEstadoDePago(idCuota);
    }

    public void aplicarIntereses() {
        List<Cuota> cuotas = obtenerCuotas();
        Date fechaActual = new Date();

        for (Cuota cuota : cuotas) {
            Date fechaVencimiento = cuota.getFechaVencimiento();
            int mesesDeAtraso = calcularMesesDeAtraso(fechaActual, fechaVencimiento);

            float monto = cuota.getMonto();
            float tasaDeInteres;

            if (!cuotaRepository.obtenerEstadoDePago(cuota.getId())){
                if (mesesDeAtraso == 0) {
                    tasaDeInteres = 0.0f;
                } else if (mesesDeAtraso == 1) {
                    tasaDeInteres = 0.03f;
                } else if (mesesDeAtraso == 2) {
                    tasaDeInteres = 0.06f;
                } else {
                    tasaDeInteres = 0.1f;
                }

                float intereses = monto * tasaDeInteres;
                float montoTotal = monto + intereses;

                cuota.setMonto(montoTotal);
                guardarCuota(cuota);
            }
        }
    }

    private int calcularMesesDeAtraso(Date fechaActual, Date fechaVencimiento) {
        Calendar calFechaActual = Calendar.getInstance();
        calFechaActual.setTime(fechaActual);

        Calendar calFechaVencimiento = Calendar.getInstance();
        calFechaVencimiento.setTime(fechaVencimiento);

        int diffYears = calFechaActual.get(Calendar.YEAR) - calFechaVencimiento.get(Calendar.YEAR);
        int diffMonths = diffYears * 12 + calFechaActual.get(Calendar.MONTH) - calFechaVencimiento.get(Calendar.MONTH);

        return diffMonths;
    }


    private List<Cuota> generarYGuardarCuotas(Estudiante estudiante, int cuotas, double montoCuota) {
        List<Cuota> cuotasGeneradas = new ArrayList<>();

        // Generar y guardar cuotas
        for (int i = 1; i <= cuotas; i++) {
            Cuota cuota = new Cuota();
            cuota.setMonto((float) montoCuota);
            cuota.setFechaInicio(new Date());
            cuota.setFechaVencimiento(calcularFechaVencimiento(cuota.getFechaInicio(), i));
            cuota.setNumeroCuota(i);
            cuota.setPagado(false);
            cuota.setRutEstudiante(estudiante.getRut());

            cuotaRepository.save(cuota);
            cuotasGeneradas.add(cuota);
        }

        return cuotasGeneradas;
    }

    public List<Cuota> generarCuotas(String rut, int cuotas){
        Estudiante estudiante = obtenerEstudiante(rut);
        double monto = calcularCuotas(estudiante, cuotas);
        List<Cuota> cuotasGeneradas = generarYGuardarCuotas(estudiante, cuotas, monto);
        return cuotasGeneradas;
    }

    public float calcularCuotas(Estudiante estudiante, int cuotas) {
        double arancel = 1500000;
        double descuento = 0;
        if (cuotas == 1) {
            double montoCuota = arancel * 0.5;
            return (float) montoCuota;
        }
        String tipo = estudiante.getTipoColegio();
        if ("Municipal".equals(tipo)) {
            descuento = 0.2;
        } else if ("Subvencionado".equals(tipo)) {
            descuento = 0.1;
        }
        LocalDate fechaActual = LocalDate.now();
        int anoActual = fechaActual.getYear();
        int anoSalida = estudiante.getAnoegreso();
        //descuento por año
        if (anoActual - anoSalida < 1) {
            descuento += 0.15;
        } else if (anoActual - anoSalida <= 2) {
            descuento += 0.08;
        } else if (anoActual - anoSalida <= 4) {
            descuento += 0.04;
        }
        int maxCuotas = 4;
        //comprobamos la cantidad de cuotas
        if ("Municipal".equals(tipo)) {
            maxCuotas = 10;
        } else if ("Subvencionado".equals(tipo)) {
            maxCuotas = 7;
        }
        if (cuotas < 1 || cuotas > maxCuotas) {
            System.out.println("Ingrese un número de cuotas válido");
            return 0; // Retornar una lista vacía en caso de cuotas inválidas
        }
        double montoCuota = (arancel * (1 - descuento)) / cuotas;
        return (float) montoCuota;
    }
    private Date calcularFechaVencimiento(Date fechaInicio, int numeroCuota) {
        // Supongamos que la fecha de vencimiento es 1 mes después de la fecha de inicio
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(fechaInicio);
        calendar.add(Calendar.MONTH, numeroCuota);
        return calendar.getTime();
    }
}
