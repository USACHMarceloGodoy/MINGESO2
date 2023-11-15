package com.example.Examen.services;

import com.example.Examen.entity.Nota;
import com.example.Examen.models.Cuota;
import com.example.Examen.models.Estudiante;
import com.example.Examen.models.Plantilla;
import com.example.Examen.repository.NotaRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class NotaServices {
    @Autowired
    private NotaRepository notaRepository;
    @Autowired
    RestTemplate restTemplate;
    public Estudiante obtenerEstudiante(String rut) {
        String url = "http://localhost:8888/api/estudiantes/buscar/" + rut;
        Estudiante estudiante = restTemplate.getForObject(url, Estudiante.class);
        return estudiante;
    }
    public List<Cuota> obtenerCuotas(String rut) {
        String url = "http://localhost:8888/api/cuotas/obtenerCuotasPorRut?rut=" + rut;

        ResponseEntity<Cuota[]> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                Cuota[].class
        );

        Cuota[] cuotasArray = responseEntity.getBody();
        if (cuotasArray != null) {
            return List.of(cuotasArray);
        } else {
            return new ArrayList<>();
        }
    }
    public void importarNotasDesdeCSV(InputStream inputStream) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        CSVParser csvParser = CSVFormat.DEFAULT.withHeader().parse(reader);

        for (CSVRecord csvRecord : csvParser) {
            // Lee los valores del CSV
            int numeroExamen = Integer.parseInt(csvRecord.get("n examen"));
            String materia = csvRecord.get("materia examen");
            int puntaje = Integer.parseInt(csvRecord.get("puntaje"));
            String estudiante = csvRecord.get("rut_estudiante");


            // Crea la entidad NotaEntity y guárdala
            Nota nota = new Nota();
            nota.setPuntaje(puntaje);
            nota.setRendido(true);
            nota.setEstudiante(estudiante);
            nota.setMateria(materia);

            // Guarda la entidad NotaEntity en la base de datos
            notaRepository.save(nota);
        }
    }
    public Plantilla generarPlantilla(String rut) {
        Estudiante estudiante = obtenerEstudiante(rut);
        List<Cuota> cuotas = obtenerCuotas(rut);
        Plantilla plantilla = new Plantilla();
        plantilla.setRut(estudiante.getRut());
        plantilla.setNombre(estudiante.getNombres());
        plantilla.setExamenes_rendidos(notaRepository.contarExamenesRendidosPorRut(rut));
        plantilla.setPromedio(notaRepository.obtenerPromedioPorRut(rut));
        //obtener el arancel de un conjunto de cuotas
        int arancel = 0;
        for (Cuota cuota : cuotas) {
            arancel += cuota.getMonto();
        }
        plantilla.setArancel(arancel);
        //obtener el tipo de pago
        if (cuotas.size() == 1) {
            plantilla.setTipo_pago("Contado");
        } else {
            plantilla.setTipo_pago("Cuotas");
        }
        //obtener el numero de cuotas
        plantilla.setNumero_cuotas(cuotas.size());
        //obtener el numero de cuotas pagadas
        int cuotas_pagadas = 0;
        for (Cuota cuota : cuotas) {
            if (cuota.isPagado()) {
                cuotas_pagadas++;
            }
        }
        plantilla.setCuotas_pagadas(cuotas_pagadas);
        //obtener el monto pagado
        int monto_pagado = 0;
        for (Cuota cuota : cuotas) {
            if (cuota.isPagado()) {
                monto_pagado += cuota.getMonto();
            }
        }
        plantilla.setMonto_pagado(monto_pagado);
        //obtener la fecha del ultimo pago
        Date ultimo_pago = null;
        for (Cuota cuota : cuotas) {
            if (cuota.isPagado()) {
                ultimo_pago = cuota.getFechaVencimiento();
            }
        }
        plantilla.setUltimo_pago(ultimo_pago);
        //obtener el saldo restante
        int saldo_restante = 0;
        for (Cuota cuota : cuotas) {
            if (!cuota.isPagado()) {
                saldo_restante += cuota.getMonto();
            }
        }
        plantilla.setSaldo_restante(saldo_restante);
        return plantilla;
    }
}
