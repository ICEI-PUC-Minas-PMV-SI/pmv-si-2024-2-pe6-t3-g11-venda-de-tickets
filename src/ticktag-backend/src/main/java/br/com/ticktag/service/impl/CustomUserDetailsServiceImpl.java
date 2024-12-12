package br.com.ticktag.service.impl;

import br.com.ticktag.domain.Usuario;
import br.com.ticktag.repository.RepositoryFacade;
import br.com.ticktag.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Slf4j
@Service
@RequiredArgsConstructor
class CustomUserDetailsServiceImpl implements CustomUserDetailsService {

    private final RepositoryFacade facade;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = facade.usuarioRepository.findByEmail(email);
        if (usuario == null) {
            throw new UsernameNotFoundException("Usuário não encontrado com o email: " + email);
        }
        return new User(usuario.getEmail(), usuario.getPassword(), Collections.emptyList());
    }
}

