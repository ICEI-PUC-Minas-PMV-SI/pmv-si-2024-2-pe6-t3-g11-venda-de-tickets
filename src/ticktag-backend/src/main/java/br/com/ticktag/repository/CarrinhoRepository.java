package br.com.ticktag.repository;

import br.com.ticktag.domain.Carrinho;
import br.com.ticktag.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    Carrinho findByUsuario(Usuario usuario);
}
