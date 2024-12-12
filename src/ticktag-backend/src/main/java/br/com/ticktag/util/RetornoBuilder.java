package br.com.ticktag.util;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public class RetornoBuilder implements RetornoBuilderInterface {

	private final Retorno instancia;

	public RetornoBuilder() {
		instancia = new Retorno();
		instancia.setDataServidor(UtilApp.obterDataAtualFusoFormatadaDDMMYYYYHHMM());
		instancia.setMensagem("");
	}

	public RetornoBuilder comCodigoMensagem(Integer codigoMensagem) {
		instancia.setCodigoMensagem(codigoMensagem != null ? codigoMensagem : HttpStatus.OK.value());
		return this;

	}

	public RetornoBuilder comObjeto(Object objeto) {
		if (objeto instanceof Exception) {
			instancia.setObjeto(UtilApp.obtemMensagemCompletaException((Exception) objeto));
		} else {
			instancia.setObjeto(objeto);
		}
		return this;
	}

	public RetornoBuilder comMensagem(String mensagem) {
		instancia.setMensagem(mensagem);
		return this;
	}

	public Retorno construir() {
		return instancia;
	}

}
