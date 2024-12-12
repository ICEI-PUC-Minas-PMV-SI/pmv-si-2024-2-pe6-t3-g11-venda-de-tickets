package br.com.ticktag.controller;

import br.com.ticktag.dto.JwtResponse;
import br.com.ticktag.dto.LoginRequest;
import br.com.ticktag.service.ServiceFacade;
import br.com.ticktag.util.JwtTokenUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final ServiceFacade facade;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest) {
        try {
            // Log de tentativa de login
            log.info("Tentativa de login para o email: {}", loginRequest.getEmail());

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = facade.customUserDetailsService.loadUserByUsername(loginRequest.getEmail());
            String jwtToken = JwtTokenUtil.generateToken(userDetails.getUsername());
            log.info("Login bem-sucedido para o email: {}", loginRequest.getEmail());
            return ResponseEntity.ok(new JwtResponse(jwtToken));

        } catch (BadCredentialsException e) {
            log.warn("Tentativa de login falhou para o email: {}", loginRequest.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas.");
        } catch (Exception e) {
            log.error("Erro inesperado ao tentar logar o email: {}", loginRequest.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro inesperado.");
        }
    }
}
