package com.exemplo.loja_pedido.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;
    
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Bloco> blocos;

    private Integer orderProduction;  // <- campo para ordem de produção
    
    private Integer  tampa;  // <- novo campo para tampa
    
    // Getters e Setters
    
    public Long getId() {
        return id;
    }

    public Integer getOrderProduction() {
        return orderProduction;
    }

    public void setOrderProduction(Integer orderProduction) {
        this.orderProduction = orderProduction;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public List<Bloco> getBlocos() {
        return blocos;
    }

    public void setBlocos(List<Bloco> blocos) {
        this.blocos = blocos;
    }

    public Integer getTampa() {
        return tampa;
    }

    public void setTampa(Integer tampa) {
        this.tampa = tampa;
    }
}