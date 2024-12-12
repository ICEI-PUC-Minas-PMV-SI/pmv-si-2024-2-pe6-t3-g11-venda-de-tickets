package br.com.ticktag.util;


import lombok.experimental.UtilityClass;

import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@UtilityClass
public class UtilApp implements Serializable {
    private final long serialVersionUID = 1L;
    public final String CONFIG_DATA_HORA = "dd/MM/yyyy - hh:mm";
    public final String CONFIG_DATA = "dd/MM/yyyy";

    public String obterDataAtualFusoFormatadaDDMMYYYYHHMM() {

        String dataFormatada = "";
        // bahia por conta governo nao ter adotado horario de verao
        ZonedDateTime zd = java.time.ZonedDateTime.now(ZoneId.of("America/Bahia"));

        Date data = Date.from(zd.toLocalDateTime().atZone(ZoneId.systemDefault()).toInstant());
        // String dateToStr = DataHelper.converteData(data,

        dataFormatada = new SimpleDateFormat(CONFIG_DATA_HORA).format(data);

        return dataFormatada;
    }

    public String obtemMensagemCompletaException(Exception e) {
        StringBuilder mensagemFinal = new StringBuilder();
        mensagemFinal.append("Erro ao processar a transação! ");
        mensagemFinal.append(e.getMessage());
        if (e.getCause() != null && e.getCause().getCause() != null && e.getCause().getCause().getMessage() != null) {
            mensagemFinal.append(" - ");
            mensagemFinal.append(e.getCause().getCause().getMessage());
        }
        if (e.getStackTrace() != null && e.getStackTrace().length > 0) {
            mensagemFinal.append(" - ");
            String erro = "";
            if (e.getStackTrace() != null) {
                for (StackTraceElement element : e.getStackTrace()) {
                    if (element.toString().contains("gasc")) {
                        erro = element.toString();
                        break;
                    }
                }
            }

            String regexObterDentroParenteseClasse = "\\((.*?)\\)";
            Pattern p = Pattern.compile(regexObterDentroParenteseClasse);
            Matcher m = p.matcher(erro);

            while (m.find()) {
                if (m.group() != null) {
                    mensagemFinal.append("'");
                    mensagemFinal.append(m.group().replace(" ", "").replace("(", "").replace(")", ""));
                    mensagemFinal.append("'");
                }

            }

        }

        return mensagemFinal.toString();

    }

    public String generateHashCode(String user, String event, String ticketType) {
        String input = user + event + ticketType + UUID.randomUUID();

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();

            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {

            throw new RuntimeException("Erro ao gerar hash: " + e.getMessage());
        }
    }
}
