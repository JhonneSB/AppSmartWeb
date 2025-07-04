package com.exemplo.loja_pedido.controller;

import java.io.IOException;
import java.net.InetAddress;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.exemplo.loja_pedido.service.PlcConnector;
import com.exemplo.loja_pedido.service.PlcReaderTask;
import com.exemplo.loja_pedido.service.SmartService;
import com.exemplo.loja_pedido.service.SmartClient.PlcConnectionManager;

@RestController
public class ClpController {

    private final Map<String, String> leiturasCache = new ConcurrentHashMap<>();
    private final ScheduledExecutorService leituraExecutor = Executors.newScheduledThreadPool(4);
    private final Map<String, ScheduledFuture<?>> leituraFutures = new ConcurrentHashMap<>();

    private static byte[] dadosClp1;
    private static byte[] dadosClp2;
    private static byte[] dadosClp3;
    private static byte[] dadosClp4;

    private SmartService smartService = new SmartService();

    @PostMapping("/start-leituras")
    public ResponseEntity<String> startLeituras(@RequestBody Map<String, String> ips) {
        ips.forEach((nome, ip) -> {
            if (!leituraFutures.containsKey(nome)) {
                PlcConnector plcConnector = PlcConnectionManager.getConexao(ip);
                if (plcConnector == null) {
                    System.err.println("Erro ao obter conexão com o CLP: " + ip);
                    return; // ignora esse CLP e continua com os demais
                }

                PlcReaderTask task = null;
                switch (nome.toLowerCase()) {
                    case "estoque" -> task = new PlcReaderTask(plcConnector, nome, 9, 0, 111, dados -> {
                        ClpController.dadosClp1 = dados;
                        smartService.clpEstoque(ip, dados);
                        atualizarCache("estoque", dados);
                    });

                    case "processo" -> task = new PlcReaderTask(plcConnector, nome, 2, 0, 9, dados -> {
                        ClpController.dadosClp2 = dados;
                        smartService.clpProcesso(ip, dados);
                        atualizarCache("processo", dados);
                    });

                    case "montagem" -> task = new PlcReaderTask(plcConnector, nome, 57, 0, 9, dados -> {
                        ClpController.dadosClp3 = dados;
                        smartService.clpMontagem(ip, dados);
                        atualizarCache("montagem", dados);
                    });

                    case "expedicao" -> task = new PlcReaderTask(plcConnector, nome, 9, 0, 48, dados -> {
                        ClpController.dadosClp4 = dados;
                        smartService.clpExpedicao(ip, dados);
                        atualizarCache("expedicao", dados);
                    });

                    default -> {
                        System.err.println("Nome de CLP inválido: " + nome);
                        return;
                    }
                }

                if (task != null) {
                    ScheduledFuture<?> future = leituraExecutor.scheduleAtFixedRate(task, 0, 800,
                            TimeUnit.MILLISECONDS);
                    leituraFutures.put(nome, future);
                }
            }
        });

        return ResponseEntity.ok("Leituras com PlcReaderTask iniciadas.");
    }

    @PostMapping("/stop-leituras")
    public ResponseEntity<String> stopLeituras() {
        leituraFutures.forEach((nome, future) -> {
            future.cancel(true);
            System.out.println("Thread de leitura '" + nome + "' cancelada.");
        });
        leituraFutures.clear();
        PlcConnectionManager.encerrarTodasAsConexoes();
        return ResponseEntity.ok("Leituras interrompidas.");
    }

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

    private void atualizarCache(String nome, byte[] dados) {
        StringBuilder sb = new StringBuilder();
        for (byte b : dados) {
            sb.append(String.format("%02X ", b));
        }
        leiturasCache.put(nome, sb.toString().trim());
    }

}