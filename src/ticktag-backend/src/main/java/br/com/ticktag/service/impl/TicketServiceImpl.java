package br.com.ticktag.service.impl;

import br.com.ticktag.domain.Evento;
import br.com.ticktag.domain.Ticket;
import br.com.ticktag.domain.TipoTicket;
import br.com.ticktag.domain.Usuario;
import br.com.ticktag.repository.RepositoryFacade;
import br.com.ticktag.service.TicketService;
import br.com.ticktag.util.ApiResponse;
import br.com.ticktag.util.UtilApp;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@Service
class TicketServiceImpl implements TicketService {

    private final RepositoryFacade facade;

    @Override
    public ApiResponse<List<Ticket>> findAll() {
        try {
            List<Ticket> listaTickets = facade.ticketRepository.findAll();
            if (!listaTickets.isEmpty()) {
                return ApiResponse.success(listaTickets);
            } else {
                return ApiResponse.error("Não foram encontrados tickets", HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ApiResponse<Ticket> findById(Long idTicket) {
        try {
            Optional<Ticket> ticket = facade.ticketRepository.findById(idTicket);
            if (ticket.isPresent()) {
                return ApiResponse.success(ticket.get());
            } else {
                return ApiResponse.error(
                        String.format("O ticket com ID: %d não foi encontrado no banco de dados", idTicket),
                        HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ApiResponse<Ticket> saveNewTicket(Ticket ticket) {
        try {
            // Gera o hashCode para o ticket
            String hashCode = this.generateHashCode(ticket);
            ticket.setHashCode(hashCode);

            // Obtém o usuário associado ao ticket
            Usuario usuario = ticket.getUsuario();
            // Adiciona o ticket ao conjunto de tickets do usuário
            usuario.getTickets().add(ticket);
            // Salva o usuário com o novo ticket
            facade.usuarioRepository.save(usuario);

            // Obtém o evento associado ao ticket
            Evento evento = ticket.getEvento();
            // Adiciona o ticket ao conjunto de tickets do evento
            evento.getTicketsEvento().add(ticket);
            // Salva o evento com o novo ticket
            facade.eventoRepository.save(evento);

            // Salva o ticket com as associações atualizadas
            facade.ticketRepository.save(ticket);

            // Retorna a resposta de sucesso com o ticket salvo
            return ApiResponse.success(ticket);
        } catch (Exception e) {
            // Em caso de erro, retorna a resposta com o erro e o status HTTP 500
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ApiResponse<Ticket> updateTicket(Long id, Optional<Usuario> usuario, Optional<Evento> evento,
                                            Optional<TipoTicket> tipoTicket) {
        try {
            Optional<Ticket> ticket = facade.ticketRepository.findById(id);
            if (ticket.isPresent()) {
                if (usuario.isPresent()) {
                    try {
                        this.updateUserTickets(ticket.get(), usuario.get());
                    } catch (Exception e) {
                        ApiResponse.error(e.getMessage(), HttpStatus.BAD_REQUEST);
                    }
                } else if (evento.isPresent()) {
                    try {
                        this.updateEventTickets(ticket.get(), evento.get());
                    } catch (Exception e) {
                        ApiResponse.error(e.getMessage(), HttpStatus.BAD_REQUEST);
                    }
                } else if (tipoTicket.isPresent()) {
                    this.updateTicketType(ticket.get(), tipoTicket.get());
                }

                String hashCode = this.generateHashCode(ticket.get());
                ticket.get().setHashCode(hashCode);

                facade.ticketRepository.save(ticket.get());

                return ApiResponse.success(ticket.get());
            } else {
                return ApiResponse.error(String.format("O ticket com ID: %d não foi encontrado no banco de dados", id),
                        HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ApiResponse<String> deleteTicket(Ticket ticket) {
        try {
            facade.ticketRepository.deleteById(ticket.getId());
            return ApiResponse.success(String.format("Ticket %d excluido com sucesso", ticket.getHashCode()));
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ApiResponse<String> deletById(Long idTicket) {
        try {
            facade.ticketRepository.deleteById(idTicket);
            return ApiResponse.success("Ticket excluido com sucesso");
        } catch (Exception e) {
            return ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String generateHashCode(Ticket ticket) {
        String user = ticket.getUsuario().getNome();
        String event = ticket.getEvento().getNomeEvento();
        String ticketType = ticket.getTipoTicket().getTipoTicket();
        String hash = UtilApp.generateHashCode(user, event, ticketType);
        return hash;
    }

    private void updateUserTickets(Ticket ticket, Usuario user) {
        Usuario oldUser = ticket.getUsuario();
        Set<Ticket> ticketsOldUser = oldUser.getTickets();

        // Verifica se o usuário antigo realmente possui o ticket
        if (ticketsOldUser.contains(ticket)) {
            // Remove o ticket do conjunto de tickets do usuário antigo
            ticketsOldUser.remove(ticket);
            oldUser.setTickets(ticketsOldUser);

            // Atualiza a associação do ticket para o novo usuário
            ticket.setUsuario(user);

            // Adiciona o ticket ao conjunto de tickets do novo usuário
            user.getTickets().add(ticket);

            // Salva as mudanças no banco de dados
            facade.usuarioRepository.save(oldUser);
            facade.usuarioRepository.save(user);
            facade.ticketRepository.save(ticket);
        } else {
            throw new IllegalArgumentException(
                    String.format("User: %s does not have the ticket: %s", oldUser.getNome(), ticket.getHashCode()));
        }
    }

    private void updateEventTickets(Ticket ticket, Evento event) {
        Evento oldEvent = ticket.getEvento();
        Set<Ticket> ticketsOldEvent = oldEvent.getTicketsEvento();

        // Verifica se o evento antigo realmente contém o ticket
        if (ticketsOldEvent.contains(ticket)) {
            // Remove o ticket do conjunto de tickets do evento antigo
            ticketsOldEvent.remove(ticket);
            oldEvent.setTicketsEvento(ticketsOldEvent);

            // Atualiza a associação do ticket para o novo evento
            ticket.setEvento(event);

            // Adiciona o ticket ao conjunto de tickets do novo evento
            event.getTicketsEvento().add(ticket);

            // Salva as mudanças no banco de dados
            facade.eventoRepository.save(oldEvent);
            facade.eventoRepository.save(event);
            facade.ticketRepository.save(ticket);
        } else {
            throw new IllegalArgumentException(
                    String.format("Event: %s does not have the ticket: %s", oldEvent.getNomeEvento(), ticket.getHashCode()));
        }
    }

    private void updateTicketType(Ticket ticket, TipoTicket tipoTicket) {
        ticket.setTipoTicket(tipoTicket);
        facade.ticketRepository.save(ticket);
    }
}
