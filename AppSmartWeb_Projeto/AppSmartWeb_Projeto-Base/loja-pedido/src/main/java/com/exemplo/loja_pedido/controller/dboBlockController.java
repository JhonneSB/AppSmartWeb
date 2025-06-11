package com.exemplo.loja_pedido.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.exemplo.loja_pedido.model.dboBlock;
import com.exemplo.loja_pedido.service.dboBlockService;

@Controller
public class dboBlockController {

    @Autowired
    private dboBlockService dboBlockService;

    // View for corrigirEstoque
    @GetMapping("/corrigirEstoque")
    public String corrigirEstoquePage() {
        return "corrigirEstoque";
    }

    @PostMapping("/corrigirEstoque")
    public ResponseEntity<Void> corrigirEstoque(@RequestBody List<dboBlock> blockList) {
        dboBlockService.atualizarBlocos(blockList);
        return ResponseEntity.ok().build();
    }
}