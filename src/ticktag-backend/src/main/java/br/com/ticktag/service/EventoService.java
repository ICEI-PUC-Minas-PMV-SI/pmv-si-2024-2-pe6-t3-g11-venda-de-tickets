package br.com.ticktag.service;

import br.com.ticktag.domain.Evento;
import br.com.ticktag.dto.EventoFilterDTO;
import br.com.ticktag.util.ApiResponse;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EventoService {
    ApiResponse<List<Evento>> findAll();

    ApiResponse<Evento> findById(Long id);

    ApiResponse<Evento> save(Evento vo);

    ApiResponse<Evento> update(Evento vo);

    ApiResponse<String> deleteById(Long id);

    ApiResponse<List<Evento>> findByParams(EventoFilterDTO filter);
}
