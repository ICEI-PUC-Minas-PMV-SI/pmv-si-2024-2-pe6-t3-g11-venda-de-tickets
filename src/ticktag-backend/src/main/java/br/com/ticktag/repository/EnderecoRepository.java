package br.com.ticktag.repository;

import br.com.ticktag.domain.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
    List<Endereco> findByIdEvento(Long idEvento);
}
