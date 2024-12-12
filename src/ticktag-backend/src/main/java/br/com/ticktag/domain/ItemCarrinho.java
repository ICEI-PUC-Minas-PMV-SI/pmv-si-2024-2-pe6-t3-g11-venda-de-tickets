package br.com.ticktag.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "TB_ITEM_CARRINHO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemCarrinho implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "TB_ITEM_CARRINHO_SEQ", sequenceName = "TB_ITEM_CARRINHO_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TB_ITEM_CARRINHO_SEQ")
    @Column(name = "ID_ITEM_CARRINHO")
    private Long id;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_CARRINHO")
    private Carrinho carrinho;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "EVENTO")
    private Evento evento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TIPO_TICKET")
    private TipoTicket tipoTicket;

    @Column(name = "QUANTIDADE")
    private Long quantidade;

    @Column(name = "STATUS")
    private String status;

}
