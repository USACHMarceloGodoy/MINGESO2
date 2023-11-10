package com.example.estudiante.controller;

import com.example.estudiante.entity.Estudiante;
import com.example.estudiante.service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/estudiantes")
public class EstudianteController {

    @Autowired
    EstudianteService estudianteServices;

    @GetMapping("/listar")
    public ResponseEntity<List<Estudiante>> listar() {
        List<Estudiante> estudiantes = (List<Estudiante>) estudianteServices.obtenerEstudiantes();
        return ResponseEntity.ok(estudiantes);
    }

    @PostMapping("/agregar")
    public Estudiante agregarEstudiante(@RequestBody Estudiante estudiante) {
        return estudianteServices.guardarEstudiante(estudiante);
    }

    @GetMapping("/buscar/{rut}")
    public ResponseEntity<Estudiante> buscarPorRut(@PathVariable String rut) {
        Estudiante estudiante = estudianteServices.obtenerPorRut(rut);
        return ResponseEntity.ok(estudiante);
    }
}
