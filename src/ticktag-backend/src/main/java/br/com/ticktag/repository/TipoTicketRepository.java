package br.com.ticktag.repository;

import br.com.ticktag.domain.TipoTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TipoTicketRepository extends JpaRepository<TipoTicket, Long> {
    List<TipoTicket> findByIdEvento(Long idEvento);
}
