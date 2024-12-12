package br.com.ticktag.service;

import br.com.ticktag.domain.ItemCarrinho;
import br.com.ticktag.util.ApiResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ItemCarrinhoService {

    ApiResponse<List<ItemCarrinho>> findAll();

    ApiResponse<ItemCarrinho> findById(Long idItemCarrinho);

    ApiResponse<ItemCarrinho> saveNewItem(ItemCarrinho itemCarrinho);

    ApiResponse<ItemCarrinho> updateItem(Long id, ItemCarrinho itemCarrinho);

    ApiResponse<ItemCarrinho> deleteItemById(Long idItemCarrinho);
}
