package com.exemplo.loja_pedido.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exemplo.loja_pedido.model.DboBlock;
import com.exemplo.loja_pedido.repository.DboBlockRepository;

@Service
public class dboBlockService
{
    @Autowired
    private DboBlockRepository blockRepository;

    public DboBlock cadastrarBloco(DboBlock block)
    {
        return blockRepository.save(block);
    }

    public void atualizarBlocos(List<DboBlock> blockList)
    {
        for (DboBlock incomingBlock : blockList)
        {
            if (incomingBlock.getId() != null && blockRepository.existsById(incomingBlock.getId()))
            {
                DboBlock existingBlock = blockRepository.findById(incomingBlock.getId()).get();
                existingBlock.setColor(incomingBlock.getColor());
                existingBlock.setStorageId(incomingBlock.getStorageId());
                existingBlock.setProductionOrder(incomingBlock.getProductionOrder());
                existingBlock.setPosition(incomingBlock.getPosition());
                blockRepository.save(existingBlock);
            } else {
                incomingBlock.setId(null);
                blockRepository.save(incomingBlock);
            }
        }
    }
    

    public List<DboBlock> listarBlocos()
    {
        return blockRepository.findAll();
    }

    public DboBlock buscarPorId(Long id)
    {
        Optional<DboBlock> bloco = blockRepository.findById(id);
        return bloco.orElseThrow(() -> new RuntimeException("Bloco não encontrado!"));
    }

    public void deletarPorId(Long id)
    {
        blockRepository.deleteById(id);
    }
}