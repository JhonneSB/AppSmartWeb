package com.exemplo.loja_pedido.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exemplo.loja_pedido.model.Estoque;

@Repository
public interface EstoqueRepository extends JpaRepository<Estoque, Long> {

    List<Estoque> findByColorOrderByPositionAsc(short color);

    Optional<Estoque> findByPosition(short position);
}