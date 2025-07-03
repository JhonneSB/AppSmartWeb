package com.exemplo.loja_pedido.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.exemplo.loja_pedido.model.Expedicao;
import com.exemplo.loja_pedido.repository.ExpedicaoRepository;
import com.exemplo.loja_pedido.service.ExpedicaoService;

@Controller
@RequestMapping("/expedicao")
public class ExpedicaoController {

    @Autowired
    private ExpedicaoRepository expedicaoRepository;
    @Autowired
    private ExpedicaoService expedicaoService;

    @GetMapping
    @ResponseBody
    public List<Expedicao> listarExpedicao() {
        return expedicaoService.listarTodos();
    }

    @PostMapping("/corrigirExpedicao")
    @ResponseBody
    public String corrigirExpedicao(@RequestBody List<Expedicao> expedicaoList) {
        expedicaoService.atualizarExpedicao(expedicaoList);
        return "Expedição atualizada com sucesso!";
    }

    @GetMapping("/valores-expedicao")
    @ResponseBody
    public Map<String, Integer> carregarValoresExpedicao() {
        List<Expedicao> lista = expedicaoRepository.findAll(Sort.by(Sort.Direction.ASC, "posicaoExpedicao"));
    
        Map<String, Integer> valores = new LinkedHashMap<>();
    
        for (Expedicao exp : lista) {
            String chave = "P" + exp.getPosicaoExpedicao(); // Ex: P1, P2...
            valores.put(chave, exp.getOrderNumber());
        }
    
        return valores;
    }
}