package com.exemplo.loja_pedido.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.exemplo.loja_pedido.model.DboBlock;

public interface DboBlockRepository extends JpaRepository<DboBlock, Long>
{
    List<DboBlock> findByColorOrderByPositionAsc(Short color);
        @Query("SELECT d.position FROM DboBlock d")
    List<Integer> findAllPosicoesOcupadas();
    Optional<DboBlock> findByPosition(Short position);
}