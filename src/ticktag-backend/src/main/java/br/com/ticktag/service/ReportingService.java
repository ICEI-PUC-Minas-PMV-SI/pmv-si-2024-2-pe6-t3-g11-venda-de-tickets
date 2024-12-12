package br.com.ticktag.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface ReportingService {
    List<Map<String, Object>> getUtilizacaoCapacidadeEvento();

    List<Map<String, Object>> getTopEventosPorCapacidade(int limit);

    Map<String, Long> getDistribuicaoEventosPorData();

    Map<String, Object> getCapacidadeMediaEvento();

    Map<Long, Long> getClassificacaoEtariaEventos();
}
