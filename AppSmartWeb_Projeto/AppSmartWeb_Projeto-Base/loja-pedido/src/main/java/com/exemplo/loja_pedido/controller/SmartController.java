package com.exemplo.loja_pedido.controller;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.exemplo.loja_pedido.dto.BlocoDTO;
import com.exemplo.loja_pedido.dto.LaminaDTO;
import com.exemplo.loja_pedido.dto.PedidoDTO;
import com.exemplo.loja_pedido.model.Estoque;
import com.exemplo.loja_pedido.model.Expedicao;
import com.exemplo.loja_pedido.repository.EstoqueRepository;
import com.exemplo.loja_pedido.repository.ExpedicaoRepository;
import com.exemplo.loja_pedido.repository.PedidoRepository;
import com.exemplo.loja_pedido.service.SmartService;

@RestController
public class SmartController {

    private final Map<String, String> leiturasCache = new ConcurrentHashMap<>();

    private final ScheduledExecutorService leituraExecutor = Executors.newScheduledThreadPool(4);
    private final Map<String, ScheduledFuture<?>> leituraFutures = new ConcurrentHashMap<>();

     private static byte[] dadosClp1;
     private static byte[] dadosClp2;
     private static byte[] dadosClp3;
     private static byte[] dadosClp4;
    @Autowired
    private SmartService smartService;

    @Autowired
    private EstoqueRepository estoqueRepository;

    @Autowired
    private ExpedicaoRepository expedicaoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @PostMapping("/iniciar-pedido")
    public ResponseEntity<String> iniciarPedido(@RequestBody PedidoDTO pedidoDTO) {
        String ipClp = pedidoDTO.getIpClp();
        List<BlocoDTO> pedido = pedidoDTO.getBlocos();

        System.out.println("Pedido recebido para IP do CLP: " + ipClp);
        for (BlocoDTO bloco : pedido) {
            System.out.println("Andar: " + bloco.getAndar() + ", Cor do Bloco: " + bloco.getCor());
            int i = 1;
            for (LaminaDTO lamina : bloco.getLaminas()) {
                System.out.println("  Lâmina-" + i + ": Cor = " + lamina.getCor() + ", Padrão = " + lamina.getPadrao());
                i++;
            }
        }

        try {
            byte[] bytePedidoArray = montarPedidoParaCLP(pedido);

            // Impressão em hexadecimal:
            System.out.print("Bytes do pedido em hexadecimal: ");
            for (byte b : bytePedidoArray) {
                System.out.printf("%02X ", b);
            }
            System.out.println();

            // Envia os bytes para o IP informado:
            smartService.enviarBlocoBytesAoClp(ipClp, 9, 2, bytePedidoArray, bytePedidoArray.length);
            // Executa o pedido
            smartService.iniciarExecucaoPedido(ipClp);

            return ResponseEntity.ok("Pedido enviado ao CLP com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao enviar pedido ao CLP: " + e.getMessage());
        }
    }

    @PostMapping("/estoque/salvar")
    public ResponseEntity<String> salvarEstoque(@RequestBody Map<String, Integer> dados) {
        try {
            byte[] byteBlocosArray = new byte[28];

            dados.forEach((posStr, valor) -> {
                try {
                    int pos = Integer.parseInt(posStr.split(":")[1]);

                    if (pos >= 1 && pos <= 28) {
                        byteBlocosArray[pos - 1] = valor.byteValue();

                        Estoque estoque = estoqueRepository.findByPosition((short)pos)
                                .orElseGet(() -> {
                                    Estoque novo = new Estoque();
                                    novo.setPosition((short)pos);
                                    return novo;
                                });

                        estoque.setColor(valor.shortValue());
                        estoqueRepository.save(estoque);
                    }
                } catch (Exception e) {
                    System.err.println("Erro ao processar posição: " + posStr + " - " + e.getMessage());
                }
            });

            return ResponseEntity.ok("Estoque salvo com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao salvar estoque: " + e.getMessage());
        }
    }

    @PostMapping("/expedicao/salvar")
    public ResponseEntity<String> salvarExpedicao(@RequestBody Map<String, Integer> dados) {
        System.out.println("Atualizando tabela Expedição!!");

        try {
            dados.forEach((posStr, valor) -> {
                try {
                    int pos = Integer.parseInt(posStr.split(":")[1]); // ex: "OP:3" → 3
                    Short posShort = (short) pos;
                    
                    if (pos >= 1 && pos <= 12) {
                        if (valor == 0) {
                            expedicaoRepository.findByPosicaoExpedicao(posShort).ifPresent(expedicaoRepository::delete);
                            System.out.println("Removida posição " + pos + " da tabela Expedição.");
                        } else {
                            Expedicao exp = expedicaoRepository
                                    .findByPosicaoExpedicao(posShort)
                                    .orElseGet(Expedicao::new);
                    
                            exp.setPosicaoExpedicao(posShort);
                            exp.setOrderNumber(valor);
                            expedicaoRepository.save(exp);
                            System.out.println("Atualizada posição " + pos + " com valor " + valor);
                        }
                    }
                } catch (Exception e) {
                    System.err.println("Erro ao processar posição: " + posStr + " - " + e.getMessage());
                }
            });

            return ResponseEntity.ok("Tabela Expedição atualizada com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar tabela Expedição: " + e.getMessage());
        }
    }

    @PostMapping("/clp/enviar-estoque")
    public ResponseEntity<String> enviarParaClp(@RequestBody Map<String, String> payload) {
        try {
            String ipClpEstoque = payload.get("ipClp");

            if (ipClpEstoque == null || ipClpEstoque.isEmpty()) {
                return ResponseEntity.badRequest().body("Endereço IP do CLP de Estoque não fornecido.");
            }

            // Buscar todos os registros do estoque
            List<Estoque> listaEstoque = estoqueRepository.findAll();
            byte[] byteBlocosArray = new byte[28];

            for (Estoque e : listaEstoque) {
                int pos = e.getPosition(); // posição de 1 a 28
                if (pos >= 1 && pos <= 28) {
                    byteBlocosArray[pos - 1] = (byte) e.getColor().shortValue();
                }
            }

            // Apenas para depuração
            System.out.print("Bytes enviados ao CLP Estoque: ");
            for (byte b : byteBlocosArray) {
                System.out.printf("%02X ", b);
            }
            System.out.println();

            // Enviar os dados ao CLP de Estoque
            smartService.enviarBlocoBytesAoClp(ipClpEstoque, 9, 68, byteBlocosArray, byteBlocosArray.length);

            return ResponseEntity.ok("Bloco de bytes enviado com sucesso para o CLP de Estoque.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao enviar dados ao CLP: " + e.getMessage());
        }
    }

    @PostMapping("/clp/enviar-expedicao")
    public ResponseEntity<String> enviarParaClpExpedicao(@RequestBody Map<String, String> payload) {
        try {
            String ipClpExpedicao = payload.get("ipClp");

            if (ipClpExpedicao == null || ipClpExpedicao.isEmpty()) {
                return ResponseEntity.badRequest().body("Endereço IP do CLP de Expedição não fornecido.");
            }

            // Buscar todos os registros da expedição
            List<Expedicao> listaExpedicao = expedicaoRepository.findAll();

            // Cada posição da expedição usa 2 bytes (short)
            byte[] byteBlocosArray = new byte[24];

            for (Expedicao e : listaExpedicao) {
                int pos = e.getPosicaoExpedicao(); // posição de 1 a 12
                int valor = e.getOrderNumber();    // valor do pedido

                if (pos >= 1 && pos <= 12) {
                    int index = (pos - 1) * 2;
                    byteBlocosArray[index] = (byte) (valor >> 8);       // High byte
                    byteBlocosArray[index + 1] = (byte) (valor & 0xFF);     // Low byte
                }
            }

            // Apenas para depuração
            System.out.print("Bytes enviados ao CLP Expedição: ");
            for (byte b : byteBlocosArray) {
                System.out.printf("%02X ", b);
            }
            System.out.println();

            // Enviar os dados ao CLP de Expedição
            smartService.enviarBlocoBytesAoClp(ipClpExpedicao, 9, 6, byteBlocosArray, byteBlocosArray.length);

            return ResponseEntity.ok("Bloco de inteiros enviado com sucesso para o CLP de Expedição.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao enviar dados ao CLP de Expedição: " + e.getMessage());
        }
    }

    @PostMapping("/update-Estoque")
    public ResponseEntity<String> updateEstoque(@RequestBody Map<String, Object> payload) {
        try {
            String ipClp = (String) payload.get("ip");
            Map<String, Integer> dados = (Map<String, Integer>) payload.get("dados");

            byte[] byteBlocosArray = new byte[28];

            dados.forEach((posStr, valor) -> {
                try {
                    int pos = Integer.parseInt(posStr.split(":")[1]);

                    if (pos >= 1 && pos <= 28) {
                        byteBlocosArray[pos - 1] = valor.byteValue();

                        // Persistência no banco de dados
                        Estoque estoque = estoqueRepository.findByPosition((short)pos)
                                .orElseGet(() -> {
                                    Estoque novo = new Estoque();
                                    novo.setPosition((short)pos);
                                    return novo;
                                });
                                estoque.setColor(valor.shortValue());
                                estoqueRepository.save(estoque);
                    }
                } catch (Exception e) {
                    System.err.println("Erro ao processar posição: " + posStr + " - " + e.getMessage());
                }
            });

            // Debug opcional
            System.out.print("Bytes do pedido em hexadecimal: ");
            for (byte b : byteBlocosArray) {
                System.out.printf("%02X ", b);
            }
            System.out.println();

            smartService.enviarBlocoBytesAoClp(ipClp, 9, 68, byteBlocosArray, byteBlocosArray.length);

            return ResponseEntity.ok("Pedido enviado ao CLP e estoque salvo com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao enviar pedido ao CLP: " + e.getMessage());
        }
    }

    @PostMapping("/update-Expedicao")
    public ResponseEntity<String> updateExpedicaoClp(@RequestBody Map<String, Object> request) {
        try {
            String ipClp = (String) request.get("ip");
            Map<String, Integer> dados = (Map<String, Integer>) request.get("dados");

            byte[] byteBlocosArray = new byte[24];

            dados.forEach((posStr, valor) -> {
                try {
                    int pos = Integer.parseInt(posStr.split(":")[1]); // exemplo: "OP:3" → 3
                    if (pos >= 1 && pos <= 12) {
                        int index = (pos - 1) * 2;
                        byteBlocosArray[index] = (byte) (valor >> 8);       // high byte
                        byteBlocosArray[index + 1] = (byte) (valor & 0xFF); // low byte
                    }
                } catch (Exception e) {
                    System.err.println("Erro ao processar posição para CLP: " + posStr + " - " + e.getMessage());
                }
            });

            smartService.enviarBlocoBytesAoClp(ipClp, 9, 6, byteBlocosArray, byteBlocosArray.length);
            return ResponseEntity.ok("Dados de expedição enviados ao CLP com sucesso.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao enviar dados ao CLP: " + e.getMessage());
        }
    }

    @GetMapping("/estoque/primeira-posicao/{cor}")
    public ResponseEntity<Integer> getPrimeiraPosicaoPorCor(@PathVariable int cor) {
        Set<Integer> posicoesUsadas = new HashSet<>(); // Para evitar duplicidade

        int posicao = smartService.buscarPrimeiraPosicaoPorCor(cor, posicoesUsadas);

        if (posicao != -1) {
            return ResponseEntity.ok(posicao);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(-1);
        }
    }

    @GetMapping("/expedicao/primeira-livre")
    public ResponseEntity<Integer> buscarLivre() {
        int posicaoLivre = smartService.buscarPrimeiraPosicaoLivreExp();
        return ResponseEntity.ok(posicaoLivre);
    }

    private byte[] montarPedidoParaCLP(List<BlocoDTO> pedido) {
        int[] dados = new int[30]; // 30 inteiros de 2 bytes = 60 bytes
        Set<Integer> posicoesUsadas = new HashSet<>(); // Para evitar duplicidade
        int andares = pedido.size();

        for (BlocoDTO bloco : pedido) {
            int indexBase = (bloco.getAndar() - 1) * 9;

            if (indexBase + 8 >= dados.length) {
                System.out.println("Ignorando andar fora do esperado: " + bloco.getAndar());
                continue;
            }

            int corBloco = Integer.parseInt(bloco.getCor());

            // Buscar posição disponível para essa cor, que ainda não foi usada
            int posicaoEstoque = smartService.buscarPrimeiraPosicaoPorCor(corBloco, posicoesUsadas);

            // Marcar como usada (se válida)
            if (posicaoEstoque != -1) {
                posicoesUsadas.add(posicaoEstoque);
            }

            dados[indexBase] = corBloco;
            dados[indexBase + 1] = posicaoEstoque;

            List<LaminaDTO> laminas = bloco.getLaminas();
            for (int i = 0; i < Math.min(3, laminas.size()); i++) {
                dados[indexBase + 2 + i] = Integer.parseInt(laminas.get(i).getCor());
                dados[indexBase + 5 + i] = Integer.parseInt(laminas.get(i).getPadrao());
            }

            dados[indexBase + 8] = 0; // processamento_Andar_X
        }

        // Buscar próximo número de orderProduction
        int nextOrderProduction = pedidoRepository.findMaxOrderProduction() + 1;
        dados[27] = nextOrderProduction;
        dados[28] = andares;
        // int posicaoExpedicao = smartService.buscarPrimeiraPosicaoLivreExp();
        // dados[29] = posicaoExpedicao;

        // Impressão dos dados antes da conversão para byte[]
        System.out.println("// InfoPedido");
        for (int andar = 1; andar <= 3; andar++) {
            int base = (andar - 1) * 9;
            System.out.println("cor_Andar_" + andar + " = " + dados[base] + ";");
            System.out.println("posicao_Estoque_Andar_" + andar + ".......: " + dados[base + 1]);
            System.out.println("cor_Lamina_1_Andar_" + andar + "..........: " + dados[base + 2]);
            System.out.println("cor_Lamina_2_Andar_" + andar + "..........: " + dados[base + 3]);
            System.out.println("cor_Lamina_3_Andar_" + andar + "..........: " + dados[base + 4]);
            System.out.println("padrao_Lamina_1_Andar_" + andar + ".......: " + dados[base + 5]);
            System.out.println("padrao_Lamina_2_Andar_" + andar + ".......: " + dados[base + 6]);
            System.out.println("padrao_Lamina_3_Andar_" + andar + ".......: " + dados[base + 7]);
            System.out.println("processamento_Andar_" + andar + ".........: " + dados[base + 8]);
            System.out.println();
        }

        // Extras, se estiverem disponíveis em algum contexto
        System.out.println("numeroPedidoEst...............: " + nextOrderProduction); // adapte conforme necessário
        System.out.println("andares.......................: " + andares);
        System.out.println("posicaoExpedicaoEst...........: " + 0); // adapte conforme necessário

        // Converte os 30 inteiros (int[30]) em 60 bytes (byte[])
        ByteBuffer buffer = ByteBuffer.allocate(60).order(ByteOrder.BIG_ENDIAN);
        for (int valor : dados) {
            buffer.putShort((short) valor);
        }

        return buffer.array();
    }

}