package com.example.Examen.models;

import com.example.Examen.repository.NotaRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;

@NoArgsConstructor
@AllArgsConstructor
public class Plantilla {

    private String rut;
    private String nombre;
    private int examenes_rendidos;
    private Double promedio;
    private Integer arancel;
    private String tipo_pago;
    private int numero_cuotas;
    private int cuotas_pagadas;
    private Integer monto_pagado;
    private LocalDate ultimo_pago;
    private Integer saldo_restante;


    private LocalDate convertirTimestampALocalDate(Timestamp timestamp) {
        return timestamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    private NotaRepository notaRepository;

    public String getRut() {
        return this.rut;
    }

    public String getNombre() {
        return this.nombre;
    }

    public int getExamenes_rendidos() {
        return this.examenes_rendidos;
    }

    public Double getPromedio() {
        return this.promedio;
    }

    public Integer getArancel() {
        return this.arancel;
    }

    public String getTipo_pago() {
        return this.tipo_pago;
    }

    public int getNumero_cuotas() {
        return this.numero_cuotas;
    }

    public int getCuotas_pagadas() {
        return this.cuotas_pagadas;
    }

    public Integer getMonto_pagado() {
        return this.monto_pagado;
    }

    public LocalDate getUltimo_pago() {
        return this.ultimo_pago;
    }

    public Integer getSaldo_restante() {
        return this.saldo_restante;
    }

    public NotaRepository getNotaRepository() {
        return this.notaRepository;
    }


}

