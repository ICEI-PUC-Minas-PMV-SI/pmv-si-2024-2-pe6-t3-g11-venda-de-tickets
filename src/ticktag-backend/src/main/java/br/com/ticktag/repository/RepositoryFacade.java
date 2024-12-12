package br.com.ticktag.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class RepositoryFacade {
    public final EnderecoRepository enderecoRepository;
    public final EventoRepository eventoRepository;
    public final RoleRepository roleRepository;
    public final UsuarioRepository usuarioRepository;
    public final TicketRepository ticketRepository;
    public final TipoTicketRepository tipoTicketRepository;
    public final CarrinhoRepository carrinhoRepository;
    public final ItemCarrinhoRepository itemCarrinhoRepository;
}
