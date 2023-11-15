package com.example.Examen.models;

import com.example.Examen.repository.NotaRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

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
    private Date ultimo_pago;
    private Integer saldo_restante;

    public void setRut(String rut) {
        this.rut = rut;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setExamenes_rendidos(int examenes_rendidos) {
        this.examenes_rendidos = examenes_rendidos;
    }

    public void setPromedio(Double promedio) {
        this.promedio = promedio;
    }

    public void setArancel(Integer arancel) {
        this.arancel = arancel;
    }

    public void setTipo_pago(String tipo_pago) {
        this.tipo_pago = tipo_pago;
    }

    public void setNumero_cuotas(int numero_cuotas) {
        this.numero_cuotas = numero_cuotas;
    }

    public void setCuotas_pagadas(int cuotas_pagadas) {
        this.cuotas_pagadas = cuotas_pagadas;
    }

    public void setMonto_pagado(Integer monto_pagado) {
        this.monto_pagado = monto_pagado;
    }

    public void setUltimo_pago(Date ultimo_pago) {
        this.ultimo_pago = ultimo_pago;
    }

    public void setSaldo_restante(Integer saldo_restante) {
        this.saldo_restante = saldo_restante;
    }


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

    public Date getUltimo_pago() {
        return this.ultimo_pago;
    }

    public Integer getSaldo_restante() {
        return this.saldo_restante;
    }


}

