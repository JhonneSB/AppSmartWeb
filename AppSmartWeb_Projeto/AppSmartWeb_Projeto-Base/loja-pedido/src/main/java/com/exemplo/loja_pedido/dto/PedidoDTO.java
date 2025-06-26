package com.exemplo.loja_pedido.dto;

import java.util.List;

public class PedidoDTO {
    private String ipClp;
    private String tipo;
    private List<BlocoDTO> blocos;

    // Getters e Setters
    
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public List<BlocoDTO> getBlocos() {
        return blocos;
    }
    public void setBlocos(List<BlocoDTO> blocos) {
        this.blocos = blocos;
    }
    public String getIpClp() {
        return ipClp;
    }
    public void setIpClp(String ipCLP) {
        this.ipClp = ipCLP;
    }

}
