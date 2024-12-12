package br.com.ticktag.controller;

import br.com.ticktag.domain.Evento;
import br.com.ticktag.dto.EventoFilterDTO;
import br.com.ticktag.service.ServiceFacade;
import br.com.ticktag.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/evento")
public class EventoController {

    private final ServiceFacade facade;

    @GetMapping()
    public ApiResponse<List<Evento>> findAll() {
        return facade.eventoService.findAll();
    }

    @GetMapping("/id/{idEvento}")
    public ApiResponse<Evento> findById(@PathVariable Long idEvento) throws Exception {
        return facade.eventoService.findById(idEvento);
    }

    @GetMapping("/filtro")
    public ApiResponse<List<Evento>> findByParams(@ModelAttribute EventoFilterDTO filter) {
        return facade.eventoService.findByParams(filter);
    }

    // Add your frontend URL
    @PostMapping()
    public ApiResponse<Evento> save(@RequestBody Evento evento) {
        return facade.eventoService.save(evento);
    }

    @PutMapping()
    public ApiResponse<Evento> update(@RequestBody Evento evento) throws Exception {
        return facade.eventoService.update(evento);
    }

    @DeleteMapping("/{idEvento}")
    public ApiResponse<String> deleteById(@PathVariable Long idEvento) {
        return facade.eventoService.deleteById(idEvento);
    }

}
