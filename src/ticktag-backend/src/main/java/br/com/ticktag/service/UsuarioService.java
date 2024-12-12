package br.com.ticktag.service;

import br.com.ticktag.domain.Usuario;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public interface UsuarioService {
    List<Usuario> listarUsuarios();

    Usuario salvarUsuario(Usuario usuario) throws ResponseStatusException;

    Optional<Usuario> buscarPorId(Long id);

    void deletarUsuario(Long id);

    Usuario buscarPorEmail(String email);
}
