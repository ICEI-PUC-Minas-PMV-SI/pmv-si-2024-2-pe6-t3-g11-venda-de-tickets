package br.com.ticktag.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ServiceFacade {
    public final CustomUserDetailsService customUserDetailsService;
    public final EventoService eventoService;
    public final ReportingService reportingService;
    public final TicketService ticketService;
    public final UsuarioService usuarioService;
    public final CarrinhoService carrinhoService;
    public final ItemCarrinhoService itemCarrinhoService;
}
