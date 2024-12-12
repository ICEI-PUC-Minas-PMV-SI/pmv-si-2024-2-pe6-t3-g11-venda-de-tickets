package br.com.ticktag.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "TB_ENDERECO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Endereco implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "TB_ENDERECO_SEQ", sequenceName = "TB_ENDERECO_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TB_ENDERECO_SEQ")
    private Long id;

    @Column(name = "ID_EVENTO")
    private Long idEvento;

    @Column(name = "NOME_LOGRADOURO")
    private String nomeLogradouro;

    @Column(name = "TIPO_LOGRADOURO")
    private String tipoLogradouro;

    @Column(name = "NUMERO")
    private Long numero;

    @Column(name = "COMPLEMENTO")
    private String complemento;

    @Column(name = "BAIRRO")
    private String bairro;

    @Column(name = "CIDADE")
    private String cidade;

    @Column(name = "UF")
    private String uf;

    @Column(name = "NOME_ESPACO")
    private String nomeEspaco;
}
