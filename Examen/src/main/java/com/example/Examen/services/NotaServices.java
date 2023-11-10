package com.example.Examen.services;

import com.example.Examen.entity.Nota;
import com.example.Examen.repository.NotaRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
@Service
public class NotaServices {
    @Autowired
    private NotaRepository notaRepository;
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
}
