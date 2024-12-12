package br.com.ticktag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtResponse {
    private String token;
    private String type = "Bearer";

    public JwtResponse(String token) {
        this.token = token;
    }
}

