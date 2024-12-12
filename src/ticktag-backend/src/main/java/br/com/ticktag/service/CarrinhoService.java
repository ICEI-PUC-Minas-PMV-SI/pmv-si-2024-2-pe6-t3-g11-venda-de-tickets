package br.com.ticktag.service;

import br.com.ticktag.domain.*;
import br.com.ticktag.util.ApiResponse;
import org.springframework.stereotype.Service;

@Service
public interface CarrinhoService {
    ApiResponse<Carrinho> findById(Long idCarrinho);

    ApiResponse<Carrinho> findByUser(String email);

    ApiResponse<Carrinho> saveNewCart(Carrinho carrinho);

    ApiResponse<Carrinho> updateCart(Long id, Carrinho carrinho);

    ApiResponse<Carrinho> deleteById(Long idCarrinho);

    ApiResponse<Carrinho> buyCart(Long id, Carrinho carrinho);
}
