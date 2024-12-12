package br.com.ticktag.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "TB_USUARIO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "TB_USUARIO_SEQ", sequenceName = "TB_USUARIO_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TB_USUARIO_SEQ")
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOME", nullable = false)
    private String nome;

    @Column(name = "DATA_NASCIMENTO", nullable = true)
    private LocalDate dataNascimento;

    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "TELEFONE", nullable = true)
    private String telefone;

    @Column(name = "CPF", nullable = false, unique = true)
    private String cpf;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @ManyToMany
    @JoinTable(
            name = "TB_USUARIO_ROLE",
            joinColumns = @JoinColumn(name = "ID_USUARIO"),
            inverseJoinColumns = @JoinColumn(name = "ID_ROLE")
    )
    @JsonIgnore
    private Set<Role> roles; // Grupos de acesso

    @ManyToMany
    @JoinTable(
            name = "TICKETS_USUARIO",
            joinColumns = @JoinColumn(name = "ID_USUARIO"),
            inverseJoinColumns = @JoinColumn(name = "ID_TICKETS")
    )
    @JsonIgnore
    private Set<Ticket> tickets;

    @ToString.Exclude
    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnore
    private Carrinho carrinho;
}
