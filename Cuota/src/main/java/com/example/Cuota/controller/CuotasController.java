package com.example.Cuota.controller;

import com.example.Cuota.entity.Cuota;
import com.example.Cuota.service.CuotaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cuotas")
public class CuotasController {
    @Autowired
    private CuotaServices cuotaServices;

    @GetMapping("/mostrarCuotasPorRut")
    public String mostrarCuotasPorRut() {
        return "mostrarCuotasPorRut";
    }
    @ResponseBody
    @GetMapping("/obtenerCuotasPorRut")
    public List<Cuota> obtenerCuotasPorRut(@RequestParam(value = "rut") String rut) {
        return cuotaServices.obtenerCuotasPorRut(rut);
    }
    @PostMapping("/actualizarEstadoDePago/{idCuota}")
    public void actualizarEstadoDePago(@PathVariable int idCuota) {
        cuotaServices.actualizarEstadoDePago(idCuota);
    }
    @GetMapping("/aplicarIntereses")
    public String aplicarIntereses() {
        try {
            cuotaServices.aplicarIntereses();
            return "redirect:/mostrarCuotasPorRut";
        } catch (Exception e) {
            // Manejo de excepciones
            return "redirect:/pagina-de-error.html";
        }
    }
    @PostMapping("/generarCuotas")
    public ResponseEntity<List<Cuota>> generarCuotas(
            @RequestParam String rut,
            @RequestParam int cuotas) {
        try {
            List<Cuota> cuotasGeneradas = cuotaServices.generarCuotas(rut, cuotas);
            return ResponseEntity.ok(cuotasGeneradas);
        } catch (Exception e) {
            // Manejo de excepciones
            return ResponseEntity.status(500).build(); // Código 500 para errores internos del servidor
        }
    }
}
