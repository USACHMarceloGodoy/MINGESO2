package com.example.estudiante.repository;

import com.example.estudiante.entity.Estudiante;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstudianteRepository extends CrudRepository<Estudiante, Long> {
    Estudiante findByRut(String rut);
}