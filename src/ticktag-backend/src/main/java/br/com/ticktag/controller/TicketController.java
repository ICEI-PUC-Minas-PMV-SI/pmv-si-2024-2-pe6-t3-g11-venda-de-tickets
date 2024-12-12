package br.com.ticktag.controller;

import br.com.ticktag.domain.Evento;
import br.com.ticktag.domain.Ticket;
import br.com.ticktag.domain.TipoTicket;
import br.com.ticktag.domain.Usuario;
import br.com.ticktag.service.ServiceFacade;
import br.com.ticktag.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/ticket")
public class TicketController {

    private final ServiceFacade facade;

    @GetMapping
    public ApiResponse<List<Ticket>> findAll() {
        return facade.ticketService.findAll();
    }

    @GetMapping("id/{idTicket}")
    public ApiResponse<Ticket> findById(@PathVariable Long idTicket) throws Exception {
        return facade.ticketService.findById(idTicket);
    }

    @PostMapping
    public ApiResponse<Ticket> save(@RequestBody Ticket ticket) {
        return facade.ticketService.saveNewTicket(ticket);
    }

    @PutMapping
    public ApiResponse<Ticket> update(@RequestBody Long id, Optional<Usuario> usuario,
                                      Optional<Evento> evento, Optional<TipoTicket> tipoTicket) throws Exception {
        return facade.ticketService.updateTicket(id, usuario, evento, tipoTicket);
    }

    @DeleteMapping("/{idTicket}")
    public ApiResponse<String> delelteById(@PathVariable Long idTicket) throws Exception {
        return facade.ticketService.deletById(idTicket);
    }

}
