package br.com.ticktag.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Retorno {

    private Integer codigoMensagem;
    private String mensagem;
    private Object objeto;
    private String dataServidor;

    public Retorno(Integer codigoMensagem, String mensagem, Object objeto) {
        this.codigoMensagem = codigoMensagem;
        this.mensagem = mensagem;
        this.objeto = objeto;
    }

    public String getDataServidor() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dataServidor = format.format(new Date());
        return dataServidor;
    }
}
