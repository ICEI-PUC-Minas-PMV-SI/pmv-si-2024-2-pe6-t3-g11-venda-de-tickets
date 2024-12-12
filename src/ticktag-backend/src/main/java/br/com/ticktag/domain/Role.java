package br.com.ticktag.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "TB_ROLE")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "TB_ROLE_SEQ", sequenceName = "TB_ROLE_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TB_ROLE_SEQ")
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOME", nullable = false, unique = true)
    private String nome;
}
