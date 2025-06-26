package com.exemplo.loja_pedido.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "expedicao")
public class Expedicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "posicao_expedicao", nullable = false)
    private Short posicaoExpedicao;

    @Column(name = "order_number", nullable = false)
    private Integer orderNumber;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Short getPosicaoExpedicao() {
        return posicaoExpedicao;
    }

    public void setPosicaoExpedicao(Short posicaoExpedicao) {
        this.posicaoExpedicao = posicaoExpedicao;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }
}
