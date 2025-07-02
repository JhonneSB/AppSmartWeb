package com.exemplo.loja_pedido.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.exemplo.loja_pedido.model.Expedicao;
import com.exemplo.loja_pedido.service.ExpedicaoService;

@Controller
@RequestMapping("/expedicao")
public class ExpedicaoController {

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
}