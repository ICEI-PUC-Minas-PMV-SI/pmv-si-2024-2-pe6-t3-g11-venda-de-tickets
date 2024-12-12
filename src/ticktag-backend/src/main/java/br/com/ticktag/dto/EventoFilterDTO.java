package br.com.ticktag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventoFilterDTO {

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date dataEvento;

    private Long classificacaoIdade;
    private Long lotacaoMaxima;
    private String nomeEvento;
    private String statusEvento;
}
