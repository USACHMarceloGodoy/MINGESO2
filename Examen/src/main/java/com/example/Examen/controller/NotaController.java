package com.example.Examen.controller;
import com.example.Examen.services.NotaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/notas")
public class NotaController {
    @Autowired
    private NotaServices notaServices;
    @PostMapping("/importar-csv")
    public ResponseEntity<String> importarNotasDesdeCSV(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return new ResponseEntity<>("El archivo está vacío.", HttpStatus.BAD_REQUEST);
            }

            InputStream inputStream = file.getInputStream();
            notaServices.importarNotasDesdeCSV(inputStream);

            return new ResponseEntity<>("Notas importadas correctamente.", HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();  // Log the exception
            return new ResponseEntity<>("Error al importar las notas desde el archivo CSV.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
