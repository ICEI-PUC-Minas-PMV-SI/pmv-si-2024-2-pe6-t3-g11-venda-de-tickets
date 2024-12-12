package br.com.ticktag.controller;

import br.com.ticktag.domain.*;
import br.com.ticktag.service.ServiceFacade;
import br.com.ticktag.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {
    private final ServiceFacade facade;

    @GetMapping("/{idCarrinho}")
    public ApiResponse<Carrinho> findById(@PathVariable Long idCarrinho) throws Exception {
        return facade.carrinhoService.findById(idCarrinho);
    }

    @GetMapping("/usuario")
    public ApiResponse<Carrinho> findByUser(@RequestParam("email") String email) throws Exception {
        return facade.carrinhoService.findByUser(email);
    }

    @PostMapping
    public ApiResponse<Carrinho> saveNewCart(@RequestBody Carrinho carrinho) throws Exception {
        return facade.carrinhoService.saveNewCart(carrinho);
    }

    @PutMapping("/{idCarrinho}")
    public ApiResponse<Carrinho> updateCart(@PathVariable Long id, Carrinho carrinho) throws Exception {
        return facade.carrinhoService.updateCart(id, carrinho);
    }

    @PutMapping("/comprar/{idCarrinho}")
    public ApiResponse<Carrinho> buyCart(@PathVariable Long idCarrinho, @RequestBody Carrinho carrinho) throws Exception {
        return facade.carrinhoService.buyCart(idCarrinho, carrinho);
    }

    @DeleteMapping("/{idCarrinho}")
    public ApiResponse<Carrinho> deleteCart(@PathVariable Long idCarrinho) throws Exception {
        return facade.carrinhoService.deleteById(idCarrinho);
    }

}
