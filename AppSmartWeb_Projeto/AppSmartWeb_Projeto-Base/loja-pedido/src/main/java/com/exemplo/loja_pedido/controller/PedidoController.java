package com.exemplo.loja_pedido.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.exemplo.loja_pedido.dto.PedidoDTO;
import com.exemplo.loja_pedido.model.Bloco;
import com.exemplo.loja_pedido.model.Lamina;
import com.exemplo.loja_pedido.model.Pedido;
import com.exemplo.loja_pedido.repository.PedidoRepository;

@Controller
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @GetMapping("/")
    public String index(Model model) {
        List<Pedido> pedidos = pedidoRepository.findAll();
        model.addAttribute("pedidos", pedidos);
        return "home";
    }

    @GetMapping("/processo_bancada")
    public String mostrarPaginaPedidos() {
        return "processo_bancada"; //
    }

    @GetMapping("/pedidos")
    public String pedido(Model model) {
        List<Pedido> pedidos = pedidoRepository.findAll();
        model.addAttribute("pedidos", pedidos);
        return "loja";
    }

    @PostMapping("/store/orders")
    @ResponseBody
    public String receberPedidos(@RequestBody List<PedidoDTO> pedidosDto) {
        System.out.println("PEDIDOS: " + pedidosDto.size());
        for (int i = 0; i < pedidosDto.size(); i++) {
            PedidoDTO pedidoDTO = pedidosDto.get(i);

            Pedido pedido = new Pedido();
            pedido.setTipo(pedidoDTO.getTipo());

            List<Bloco> blocos = pedidoDTO.getBlocos().stream().map(blocoDTO -> {
                Bloco bloco = new Bloco();
                bloco.setCor(blocoDTO.getCor());
                bloco.setPedido(pedido);

                List<Lamina> laminas = blocoDTO.getLaminas().stream().map(laminaDTO -> {
                    Lamina lamina = new Lamina();
                    lamina.setCor(laminaDTO.getCor());
                    lamina.setPadrao(laminaDTO.getPadrao());
                    lamina.setBloco(bloco);
                    return lamina;
                }).collect(Collectors.toList());

                bloco.setLaminas(laminas);
                return bloco;
            }).collect(Collectors.toList());

            pedido.setBlocos(blocos);

            Integer maxOrder = pedidoRepository.findMaxOrderProduction(); // já retorna 0 se não houver pedidos
            pedido.setOrderProduction(maxOrder + 1);
            pedidoRepository.save(pedido);

            // Impressão no console
            System.out.println("=== Pedido " + (i + 1) + " ===");
            System.out.println("Tipo: " + pedido.getTipo());

            for (int b = 0; b < pedido.getBlocos().size(); b++) {
                Bloco bloco = pedido.getBlocos().get(b);
                System.out.println("  Bloco " + (b + 1));
                System.out.println("    Cor do Bloco: " + bloco.getCor());

                List<Lamina> laminas = bloco.getLaminas();
                for (int l = 0; l < laminas.size(); l++) {
                    Lamina lamina = laminas.get(l);
                    System.out.println("      Lâmina " + (l + 1));
                    System.out.println("        Cor: " + lamina.getCor());
                    System.out.println("        Padrão: " + lamina.getPadrao());
                }
            }
        }
        return "OK";
    }

    @GetMapping("/store/orders")
    @ResponseBody
    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }

    @DeleteMapping("/api/pedidos/{id}") // Alterado para corresponder ao chamado no JS
    public ResponseEntity<String> excluirPedido(@PathVariable Long id) {
        try {
            Optional<Pedido> pedido = pedidoRepository.findById(id);

            if (pedido.isPresent()) {
                pedidoRepository.deleteById(id);
                return ResponseEntity.ok("DELETADO");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Pedido não encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao excluir pedido: " + e.getMessage());
        }
    }

    @GetMapping("/editar_clp4")
    public String editarClp4(Model model) {
        return "editar_clp4"; // Retorna a tela que você criou acima
    }

    @GetMapping("/editar_clp1")
    public String editarClp1(Model model) {
        return "editar_clp1"; // Retorna a tela que você criou acima

    }

    @GetMapping("/listar_pedidos")
    public String listarPedidosPage(Model model) {
        List<Pedido> pedidos = pedidoRepository.findAll();
        model.addAttribute("pedidos", pedidos);
        return "lista_pedido"; // Nome do template Thymeleaf
    }

}
