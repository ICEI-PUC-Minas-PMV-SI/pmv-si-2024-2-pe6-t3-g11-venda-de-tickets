package br.com.ticktag.controller;

import br.com.ticktag.service.ServiceFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/reports")
public class ReportingController {

    private final ServiceFacade facade;

    @GetMapping("/event-capacity-utilization")
    public List<Map<String, Object>> getUtilizacaoCapacidadeEvento() {
        return facade.reportingService.getUtilizacaoCapacidadeEvento();
    }

    @GetMapping("/top-events-by-capacity")
    public List<Map<String, Object>> getTopEventosPorCapacidade(@RequestParam("limit") int limit) {
        return facade.reportingService.getTopEventosPorCapacidade(limit);
    }

    @GetMapping("/event-distribution-by-date")
    public Map<String, Long> getDistribuicaoEventosPorData() {
        return facade.reportingService.getDistribuicaoEventosPorData();
    }

    @GetMapping("/average-event-capacity")
    public Map<String, Object> getCapacidadeMediaEvento() {
        return facade.reportingService.getCapacidadeMediaEvento();
    }

    @GetMapping("/event-age-classification-breakdown")
    public Map<Long, Long> getClassificacaoEtariaEventos() {
        return facade.reportingService.getClassificacaoEtariaEventos();
    }

}
