package br.com.ticktag.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ticktag.domain.Ticket;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
