package com.exemplo.loja_pedido.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.exemplo.loja_pedido.model.Estoque;
import com.exemplo.loja_pedido.service.EstoqueService;

@Controller
public class dboBlockController {

    @Autowired
    private EstoqueService dboBlockService;

    // View for corrigirEstoque
    @GetMapping("/corrigirEstoque")
    public String corrigirEstoquePage() {
        return "corrigirEstoque";
    }

    @PostMapping("/corrigirEstoque")
    public ResponseEntity<Void> corrigirEstoque(@RequestBody List<Estoque> blockList) {
        dboBlockService.atualizarEstoques(blockList);
        return ResponseEntity.ok().build();   
   
    }

    

    @GetMapping("/valores-estoque")
    @ResponseBody
    public Map<String, Integer> obterValoresEstoque() {
        List<Estoque> lista = dboBlockService.listarEstoques();
    
        Map<String, Integer> mapa = new HashMap<>();
    
        for (Estoque estoque : lista) {
            // Supondo que getPosicao() retorna int de 1 a 28 e getCor() retorna int de 0 a 3
            mapa.put("P" + estoque.getPosition(), estoque.getColor().intValue());
        }
    
        return mapa;
    }
}