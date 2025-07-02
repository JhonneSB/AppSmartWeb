package com.exemplo.loja_pedido.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.exemplo.loja_pedido.model.Expedicao;

@Repository
public interface ExpedicaoRepository extends JpaRepository<Expedicao, Long> {

    @Query("SELECT e.posicaoExpedicao FROM Expedicao e WHERE e.orderNumber IS NOT NULL AND e.orderNumber <> 0")
    List<Integer> findAllPosicoesOcupadas();

    Optional<Expedicao> findByPosicaoExpedicao(Short posicaoExpedicao);
}