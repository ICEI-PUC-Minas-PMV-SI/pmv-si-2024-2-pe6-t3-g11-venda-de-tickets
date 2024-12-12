package br.com.ticktag.controller;

import br.com.ticktag.domain.ItemCarrinho;
import br.com.ticktag.service.ServiceFacade;
import br.com.ticktag.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/item-carrinho")
public class ItemCarrinhoController {
    private final ServiceFacade facade;

    @GetMapping
    public ApiResponse<List<ItemCarrinho>> findAll(){
        return facade.itemCarrinhoService.findAll();
    }

    @GetMapping("/{idItemCarrinho}")
    public ApiResponse<ItemCarrinho> findById(@PathVariable Long idItemCarrinho) throws Exception {
        return facade.itemCarrinhoService.findById(idItemCarrinho);
    }

    @PostMapping
    public ApiResponse<ItemCarrinho> saveNewItem(@RequestBody ItemCarrinho itemCarrinho) throws Exception {
        return facade.itemCarrinhoService.saveNewItem(itemCarrinho);
    }

    @PutMapping("/{idItemCarrinho}")
    public ApiResponse<ItemCarrinho> updateItem(@PathVariable Long idItemCarrinho, @RequestBody ItemCarrinho itemCarrinho) throws Exception {
        return facade.itemCarrinhoService.updateItem(idItemCarrinho, itemCarrinho);
    }

    @DeleteMapping("/{idItemCarrinho}")
    public ApiResponse<ItemCarrinho> deleteItemById(@PathVariable Long idItemCarrinho) throws Exception {
        return facade.itemCarrinhoService.deleteItemById(idItemCarrinho);
    }

}
