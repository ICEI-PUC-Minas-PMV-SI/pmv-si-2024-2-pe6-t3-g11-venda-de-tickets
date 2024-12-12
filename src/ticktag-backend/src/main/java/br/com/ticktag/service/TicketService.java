package br.com.ticktag.service;

import br.com.ticktag.domain.Evento;
import br.com.ticktag.domain.Ticket;
import br.com.ticktag.domain.TipoTicket;
import br.com.ticktag.domain.Usuario;
import br.com.ticktag.util.ApiResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface TicketService {
    ApiResponse<List<Ticket>> findAll();

    ApiResponse<Ticket> findById(Long idTicket);

    ApiResponse<Ticket> saveNewTicket(Ticket ticket);

    ApiResponse<Ticket> updateTicket(Long id, Optional<Usuario> usuario, Optional<Evento> evento, Optional<TipoTicket> tipoTicket);

    ApiResponse<String> deletById(Long idTicket);

    ApiResponse<String> deleteTicket(Ticket ticket);
}
