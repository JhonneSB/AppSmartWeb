package com.exemplo.loja_pedido.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exemplo.loja_pedido.model.DboBlock;

public interface DboBlockRepository extends JpaRepository<DboBlock, Long>
{

}