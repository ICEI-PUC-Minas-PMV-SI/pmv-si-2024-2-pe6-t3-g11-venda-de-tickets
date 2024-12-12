package br.com.ticktag.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "TB_EVENTO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Evento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "TB_EVENTO_SEQ", sequenceName = "TB_EVENTO_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TB_EVENTO_SEQ")
    @Column(name = "ID_EVENTO")
    private Long id;

    @Column(name = "NOME_EVENTO")
    private String nomeEvento;

    @Column(name = "STATUS_EVENTO")
    private String statusEvento;

    @Column(name = "DATA_EVENTO")
    private Date dataEvento;

    @OneToOne
    @JoinColumn(name = "ID_EVENTO", referencedColumnName = "ID_EVENTO")
    private Endereco endereco;

    @OneToMany
    @JoinColumn(name = "ID_EVENTO", referencedColumnName = "ID_EVENTO", insertable = false, updatable = false)
    private Set<TipoTicket> tickets = new HashSet<>();

    @OneToMany
    @JsonIgnore
    @JoinColumn(name = "ID_EVENTO", referencedColumnName = "ID_EVENTO", insertable = false, updatable = false)
    private Set<Ticket> ticketsEvento = new HashSet<>();

    @Column(name = "LOTACAO_MAX")
    private Long lotacaoMaxima;

    @Column(name = "CLASSIFICACAO_IDADE")
    private Long classificacaoIdade;

    @Lob
    @Column(name = "CAPA_EVENTO", columnDefinition = "MEDIUMBLOB")
    private byte[] capaEvento;

    @Transient
    private String baseImagem;

    @Override
    public int hashCode() {
        return Objects.hash(classificacaoIdade, dataEvento, endereco, id, lotacaoMaxima, nomeEvento, statusEvento, tickets);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Evento other = (Evento) obj;
        return Objects.equals(classificacaoIdade, other.classificacaoIdade) &&
                Objects.equals(dataEvento, other.dataEvento) &&
                Objects.equals(endereco, other.endereco) &&
                Objects.equals(id, other.id) &&
                Objects.equals(lotacaoMaxima, other.lotacaoMaxima) &&
                Objects.equals(nomeEvento, other.nomeEvento) &&
                Objects.equals(statusEvento, other.statusEvento) &&
                Objects.equals(tickets, other.tickets);
    }
}
