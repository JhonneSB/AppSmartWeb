package com.exemplo.loja_pedido.controller;

import java.io.IOException;
import java.net.InetAddress;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClpController {

    @PostMapping("/smart/ping")
    public Map<String, Boolean> pingHosts(@RequestBody Map<String, String> ips) {
        Map<String, Boolean> resultados = new HashMap<>();
        ips.forEach((nome, ip) -> {
            try {
                boolean online = InetAddress.getByName(ip).isReachable(2000);
                resultados.put(nome, online);
            } catch (IOException e) {
                resultados.put(nome, false);
            }
        });
        return resultados;
    }

    
}