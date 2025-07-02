package com.exemplo.loja_pedido.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exemplo.loja_pedido.model.Estoque;
import com.exemplo.loja_pedido.repository.EstoqueRepository;

@Service
public class EstoqueService {

    @Autowired
    private EstoqueRepository estoqueRepository;

    public Estoque cadastrarEstoque(Estoque estoque) {
        return estoqueRepository.save(estoque);
    }

    public void atualizarEstoques(List<Estoque> listaEstoque) {
        for (Estoque estoqueEntrada : listaEstoque) {
            if (estoqueEntrada.getId() != null && estoqueRepository.existsById(estoqueEntrada.getId())) {
                Estoque estoqueExistente = estoqueRepository.findById(estoqueEntrada.getId()).get();
                estoqueExistente.setColor(estoqueEntrada.getColor());
                estoqueExistente.setPosition(estoqueEntrada.getPosition());
                estoqueRepository.save(estoqueExistente);
            } else {
                estoqueEntrada.setId(null);
                estoqueRepository.save(estoqueEntrada);
            }
        }
    }

    public List<Estoque> listarEstoques() {
        return estoqueRepository.findAll();
    }

    public Estoque buscarPorId(Long id) {
        Optional<Estoque> estoque = estoqueRepository.findById(id);
        return estoque.orElseThrow(() -> new RuntimeException("Estoque não encontrado!"));
    }

    public void deletarPorId(Long id) {
        estoqueRepository.deleteById(id);
    }
}