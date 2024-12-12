package br.com.ticktag.controller;

import br.com.ticktag.domain.Usuario;
import br.com.ticktag.service.ServiceFacade;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final ServiceFacade facade;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = facade.usuarioService.listarUsuarios();
        if (usuarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@Valid @RequestBody Usuario usuario) {
        // Validações de dados obrigatórios
        if (usuario.getEmail() == null || usuario.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        if (usuario.getPassword() == null || usuario.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        Usuario usuarioSalvo = facade.usuarioService.salvarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
        Optional<Usuario> usuario = facade.usuarioService.buscarPorId(id);
        if (usuario.isPresent()) {
            facade.usuarioService.deletarUsuario(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario> buscarUsuarioPorEmail(@PathVariable String email) {
        Usuario usuario = facade.usuarioService.buscarPorEmail(email);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuarioPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = facade.usuarioService.buscarPorId(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
