package com.exemplo.loja_pedido.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exemplo.loja_pedido.model.Expedicao;
import com.exemplo.loja_pedido.repository.ExpedicaoRepository;

@Service
public class expedicaoService {

    @Autowired
    private ExpedicaoRepository expedicaoRepository;

    public Expedicao salvar(Expedicao expedicao) {
        return expedicaoRepository.save(expedicao);
    }

    public List<Expedicao> listarTodas() {
        return expedicaoRepository.findAll();
    }

    public void deletarPorId(Long id) {
        expedicaoRepository.deleteById(id);
    }

    public int buscarPrimeiraPosicaoLivreExp() {
        List<Integer> ocupadas = expedicaoRepository.findAllPosicoesOcupadas();

        for (int i = 1; i <= 12; i++) {
            if (!ocupadas.contains(i)) {
                return i;
            }
        }
        return -1; // Nenhuma posição livre
    }
}