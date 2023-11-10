package com.example.Examen.repository;

import com.example.Examen.entity.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {
    //Obtener promedio de examenes por rut
    @Query("SELECT AVG(n.puntaje) FROM Nota n WHERE n.estudiante = :rut")
    Double obtenerPromedioPorRut(@Param("rut") String rut);
    //Contar examenes rendidos por rut
    @Query("SELECT COUNT(n.puntaje) FROM Nota n WHERE n.estudiante = :rut")
    Integer contarExamenesRendidosPorRut(@Param("rut") String rut);
    //Obtener promedio de examenes por rut
    @Query("SELECT AVG(n.puntaje) FROM Nota n WHERE n.estudiante = :rut")
    Double obtenerPromedioPorRutYMateria(@Param("rut") String rut);
}
