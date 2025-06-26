package com.exemplo.loja_pedido.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.exemplo.loja_pedido.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Query("SELECT COALESCE(MAX(p.orderProduction), 0) FROM Pedido p")
    int findMaxOrderProduction();
}

