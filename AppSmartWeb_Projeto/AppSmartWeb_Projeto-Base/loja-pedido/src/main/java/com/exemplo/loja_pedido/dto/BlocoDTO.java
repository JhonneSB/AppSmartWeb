package com.exemplo.loja_pedido.dto;

import java.util.List;

public class BlocoDTO {
    private int andar;
    private String cor;
    private int posicaoEstoque;
    private List<LaminaDTO> laminas;
    
    // Getters e Setters
    
    public String getCor() {
        return cor;
    }
    public void setCor(String cor) {
        this.cor = cor;
    }
    public List<LaminaDTO> getLaminas() {
        return laminas;
    }
    public void setLaminas(List<LaminaDTO> laminas) {
        this.laminas = laminas;
    }
    public int getAndar() {
        return andar;
    }
    public void setAndar(int andar) {
        this.andar = andar;
    }
    public int getPosicaoEstoque() {
        return posicaoEstoque;
    }
    public void setPosicaoEstoque(int posicaoEstoque) {
        this.posicaoEstoque = posicaoEstoque;
    }

}
