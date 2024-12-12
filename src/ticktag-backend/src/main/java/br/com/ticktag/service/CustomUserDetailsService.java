package br.com.ticktag.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public interface CustomUserDetailsService extends UserDetailsService {
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

}
