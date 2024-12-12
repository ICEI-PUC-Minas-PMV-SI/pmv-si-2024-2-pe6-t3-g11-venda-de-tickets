package br.com.ticktag.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "TB_TIPO_TICKET")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoTicket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "TB_TIPO_TICKET_SEQ", sequenceName = "TB_TIPO_TICKET_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TB_TIPO_TICKET_SEQ")
    private Long id;

    @Column(name = "ID_EVENTO")
    private Long idEvento;

    @Column(name = "LOTE")
    private Long lote;

    @Column(name = "QTD_LOTE")
    private Long qtdLote;

    @Column(name = "VALOR_TICKET")
    private Double valorTicket;

    @Column(name = "VALOR_MEIA_TICKET")
    private Double valorMeiaTicket;

    @Column(name = "TIPO_TICKET")
    private String tipoTicket;

    @Column(name = "STATUS_TICKET")
    private String statusTicket;

    @OneToMany(mappedBy = "tipoTicket", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Ticket> tickets = new HashSet<>();
}

