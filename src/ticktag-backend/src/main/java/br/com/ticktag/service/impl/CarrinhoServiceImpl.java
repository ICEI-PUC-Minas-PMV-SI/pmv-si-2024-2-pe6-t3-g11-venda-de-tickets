package br.com.ticktag.service.impl;

import br.com.ticktag.domain.*;
import br.com.ticktag.repository.RepositoryFacade;
import br.com.ticktag.service.CarrinhoService;
import br.com.ticktag.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.Optional;

@RequiredArgsConstructor
@Service
class CarrinhoServiceImpl implements CarrinhoService {

    private  final RepositoryFacade facade;

    @Override
    public ApiResponse<Carrinho> findById(Long idCarrinho){
        try {
            Optional<Carrinho> carrinho = facade.carrinhoRepository.findById(idCarrinho);
            if(carrinho.isPresent()){
                return ApiResponse.success(carrinho.get());
            } else {
                return ApiResponse.error(
                        String.format("O carrinho com ID: %d não foi encontrado no banco de dados", idCarrinho),
                        HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ApiResponse<Carrinho> findByUser(String email) {
        try {
            Usuario usuario = facade.usuarioRepository.findByEmail(email);
            Carrinho carrinho = usuario.getCarrinho();
            return ApiResponse.success(carrinho);
        } catch (Exception e){
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ApiResponse<Carrinho> saveNewCart(Carrinho Carrinho) {
        try {
            String emailUsuario = Carrinho.getUsuario().getEmail();
            Usuario usuario = facade.usuarioRepository.findByEmail(emailUsuario);


        } catch (Exception e) {
            ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }

    @Override
    public ApiResponse<Carrinho> updateCart(Long id, Carrinho Carrinho) {
        try {
            Optional<Carrinho> carrinhoRep = facade.carrinhoRepository.findById(id);

            if(carrinhoRep.isPresent()) {
                Carrinho carrinho;
                carrinho = Carrinho;
                carrinho = facade.carrinhoRepository.save(carrinho);
                return ApiResponse.success(carrinho);
            } else {
                return ApiResponse.error(String.format("Carrinho com id: %d não existente", id), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e){
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ApiResponse<Carrinho> deleteById(Long idCarrinho) {
        try {
            Optional<Carrinho> carrinho = facade.carrinhoRepository.findById(idCarrinho);

            if(carrinho.isPresent()) {
                facade.carrinhoRepository.deleteById(idCarrinho);
                return ApiResponse.success(carrinho.get());
            } else {
                return ApiResponse.error(String.format("Carrinho com id: %d não existente", idCarrinho), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e){
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // TODO: Transform the paid items in Tickets and filter the items according to "Pending" status
    @Override
    public ApiResponse<Carrinho> buyCart(Long id, Carrinho carrinho){
        try {
            String pago = new String("PAGO");
            for(ItemCarrinho item : carrinho.getItensCarrinho()){
                if(item.getStatus().equals(pago)){
                    continue;
                } else {
                    item.setStatus("PAGO");
                    item = facade.itemCarrinhoRepository.save(item);
                }
            }
            carrinho = facade.carrinhoRepository.save(carrinho);
            return ApiResponse.success(carrinho);
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
