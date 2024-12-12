package br.com.ticktag.config;

import br.com.ticktag.service.ServiceFacade;
import br.com.ticktag.util.JwtTokenUtil;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final ServiceFacade facade;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull FilterChain filterChain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // Verifica se o token JWT está presente no cabeçalho da requisição
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            try {
                username = JwtTokenUtil.extractUsername(jwt);
            } catch (MalformedJwtException e) {
                // Log de erro para JWT malformado e retorno de status 401
                log.error("JWT malformado: {}", e.getMessage());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token JWT inválido ou malformado");
                return;
            } catch (Exception e) {
                log.error("Erro ao extrair o username do JWT: {}", e.getMessage());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Erro ao processar o token JWT");
                return;
            }
        } else {
            log.warn("Authorization header ausente ou com formato incorreto");
        }

        // Se o token é válido e o usuário não está autenticado
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = facade.customUserDetailsService.loadUserByUsername(username);

            // Verifica se o token é válido
            if (JwtTokenUtil.validateToken(jwt, userDetails)) {

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                usernamePasswordAuthenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            } else {
                log.warn("Token JWT inválido para o usuário: {}", username);
            }
        }

        filterChain.doFilter(request, response);
    }
}