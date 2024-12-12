package br.com.ticktag.domain;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "TB_CARRINHO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Carrinho implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "TB_CARRINHO_SEQ", sequenceName = "TB_CARRINHO_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TB_CARRINHO_SEQ")
    @Column(name = "ID")
    private Long id;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToOne
    @JoinColumn(name = "ID_USUARIO")
    private Usuario usuario;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "carrinho", fetch = FetchType.LAZY)
    private Set<ItemCarrinho> itensCarrinho = new HashSet<>();
}
