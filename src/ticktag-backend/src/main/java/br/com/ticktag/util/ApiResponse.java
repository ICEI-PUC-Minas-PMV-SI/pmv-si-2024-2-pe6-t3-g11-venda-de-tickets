package br.com.ticktag.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T> {
    private int statusCode;
    private String message;
    private T data;

    // Métodos de fábrica para facilitar a criação de respostas
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(HttpStatus.OK.value(), "Success", data);
    }

    public static <T> ApiResponse<T> error(String message, HttpStatus status) {
        return new ApiResponse<>(status.value(), message, null);
    }
}