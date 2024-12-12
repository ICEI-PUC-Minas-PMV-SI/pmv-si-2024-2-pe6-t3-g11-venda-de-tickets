package br.com.ticktag.service.impl;

import br.com.ticktag.domain.Carrinho;
import br.com.ticktag.domain.ItemCarrinho;
import br.com.ticktag.domain.Usuario;
import br.com.ticktag.repository.RepositoryFacade;
import br.com.ticktag.service.ItemCarrinhoService;
import br.com.ticktag.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@Service
class ItemCarrinhoImpl implements ItemCarrinhoService {

    private  final RepositoryFacade facade;

    @Override
    public ApiResponse<List<ItemCarrinho>> findAll(){
        try {
            List<ItemCarrinho> itensCarrinho = facade.itemCarrinhoRepository.findAll();
            if(itensCarrinho != null){
                return ApiResponse.success(itensCarrinho);
            } else {
                return ApiResponse.error("Itens não encontrados", HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ApiResponse<ItemCarrinho> findById(Long idItemCarrinho){
        try {
            Optional<ItemCarrinho> itemCarrinho = facade.itemCarrinhoRepository.findById(idItemCarrinho);
            if(itemCarrinho.isPresent()){
                return ApiResponse.success(itemCarrinho.get());
            } else {
                return ApiResponse.error(
                        String.format("O item com ID: %d não foi encontrado no banco de dados", idItemCarrinho),
                        HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ApiResponse<ItemCarrinho> saveNewItem(ItemCarrinho itemCarrinho) {
        try {
            // Verifica se o usuario existe
            String email = itemCarrinho.getCarrinho().getUsuario().getEmail();
            Usuario usuario = facade.usuarioRepository.findByEmail(email);

            if(usuario != null){
                // Verifica se o carrinho esta associado ao usuario
                Carrinho carrinho = usuario.getCarrinho();

                if(carrinho != null){
                    // Salva o novo item e o carrinho associado
                    ItemCarrinho novoItem = saveItem(itemCarrinho, carrinho);
                    saveCartWithNewItem(carrinho, novoItem);
                    return ApiResponse.success(novoItem);
                }
            }

            System.out.println(itemCarrinho);
            return ApiResponse.success(itemCarrinho);
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ItemCarrinho saveItem(ItemCarrinho itemCarrinho, Carrinho carrinho){
        ItemCarrinho novoItem = ItemCarrinho.builder()
                                                .carrinho(carrinho)
                                                .evento(itemCarrinho.getEvento())
                                                .tipoTicket(itemCarrinho.getTipoTicket())
                                                .quantidade(itemCarrinho.getQuantidade())
                                                .status(itemCarrinho.getStatus())
                                                .build();
        novoItem = facade.itemCarrinhoRepository.save(novoItem);
        return novoItem;
    }

    private Carrinho saveCartWithNewItem(Carrinho carrinho, ItemCarrinho novoItem){
        if(carrinho.getItensCarrinho() == null){
            Set<ItemCarrinho> setItens = new HashSet<>();
            setItens.add(novoItem);
            carrinho.setItensCarrinho(setItens);
        } else {
            carrinho.getItensCarrinho().add(novoItem);
        }
        return facade.carrinhoRepository.save(carrinho);
    }


    @Override
    public ApiResponse<ItemCarrinho> updateItem(Long id, ItemCarrinho itemCarrinho) {
        try {
            // Verifica se a quantidade é maior ou igual a 1, para modificá-la
            if (itemCarrinho.getQuantidade() >= 1) {
                Optional<ItemCarrinho> item = facade.itemCarrinhoRepository.findById(id);

                // Verifica se o item do carrinho ja existe
                if (item.isPresent()) {
                    ItemCarrinho itemAtualizado = atualizaItemCarrinho(item.get(), itemCarrinho);
                    saveCartWithNewItem(itemAtualizado.getCarrinho(), itemAtualizado);
                    return ApiResponse.success(itemAtualizado);
                } else {
                    return ApiResponse.error("Item não encontrado", HttpStatus.INTERNAL_SERVER_ERROR);
                }

            } else {
                return ApiResponse.error("A quantidade mínima é: 1", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ItemCarrinho atualizaItemCarrinho(ItemCarrinho itemAntigo, ItemCarrinho novoItem){
        ItemCarrinho itemAtualizado = ItemCarrinho.builder()
                                                    .id(itemAntigo.getId())
                                                    .carrinho(itemAntigo.getCarrinho())
                                                    .evento(itemAntigo.getEvento())
                                                    .tipoTicket(itemAntigo.getTipoTicket())
                                                    .status(novoItem.getStatus())
                                                    .quantidade(novoItem.getQuantidade())
                                                    .build();
        itemAtualizado = facade.itemCarrinhoRepository.save(itemAtualizado);
        return itemAtualizado;
    }

    @Override
    public ApiResponse<ItemCarrinho> deleteItemById(Long idItemCarrinho) {
        try {
            Optional<ItemCarrinho> itemCarrinho = facade.itemCarrinhoRepository.findById(idItemCarrinho);
            // Verifica se o item do carrinho existe
            if (itemCarrinho.isPresent()) {
                deleteItem(itemCarrinho.get());
                return ApiResponse.success(itemCarrinho.get());
            } else {
                return ApiResponse.error("Item não existente", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e){
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void deleteItem(ItemCarrinho itemCarrinho){
        facade.itemCarrinhoRepository.deleteById(itemCarrinho.getId());
    }

}
