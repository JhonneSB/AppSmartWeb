package com.exemplo.loja_pedido.service;

import com.exemplo.loja_pedido.model.Expedicao;
import com.exemplo.loja_pedido.repository.ExpedicaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExpedicaoService {

    @Autowired
    private ExpedicaoRepository expedicaoRepository;

    public List<Expedicao> listarTodos() {
        return expedicaoRepository.findAll();
    }

    public void atualizarExpedicao(List<Expedicao> expedicaoList) {
        // Limpa todas as posições no banco
        expedicaoRepository.deleteAll();
    
        // Cria uma lista completa com as 12 posições
        List<Expedicao> listaCompleta = new ArrayList<>();
    
        for (short i = 1; i <= 12; i++) {
            final short posicao = i;
    
            // Busca na lista recebida se existe posição i
            Expedicao expedicao = expedicaoList.stream()
                .filter(e -> e.getPosicaoExpedicao() == posicao)
                .findFirst()
                .orElse(new Expedicao());
    
            // Caso orderNumber seja nulo ou 0, setar null explicitamente
            if (expedicao.getOrderNumber() == null) {
                // Se orderNumber for nulo, seta 0 ou algum valor default que não quebre o banco
                expedicao.setOrderNumber(0); // Ou algum número válido para indicar "vazio"
            }
    
            // Força a posição da expedição para garantir
            expedicao.setPosicaoExpedicao(posicao);
    
            listaCompleta.add(expedicao);
        }
    
        // Salva todas as posições (ocupadas ou vazias)
        expedicaoRepository.saveAll(listaCompleta);
    }

    public List<Expedicao> getTodasPosicoes() {
        List<Expedicao> todasPosicoes = new ArrayList<>();
        List<Expedicao> posicoesOcupadas = expedicaoRepository.findAll();
        
        // Garante que retorne todas as 12 posições
        for (short i = 1; i <= 12; i++) {
            final short posicao = i;
            Expedicao expedicao = posicoesOcupadas.stream()
                .filter(p -> p.getPosicaoExpedicao() == posicao)
                .findFirst()
                .orElse(new Expedicao());
            
            expedicao.setPosicaoExpedicao(posicao);
            todasPosicoes.add(expedicao);
        }
        
        return todasPosicoes;
    }
}