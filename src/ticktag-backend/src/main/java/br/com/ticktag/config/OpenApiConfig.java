package br.com.ticktag.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class OpenApiConfig {

	private SecurityScheme createAPIKeyScheme() {
		return new SecurityScheme().type(SecurityScheme.Type.HTTP)
				.bearerFormat("JWT")
				.scheme("bearer");
	}

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
				.info(new Info()
						.title("API TickTag")
						.version("v1")
						.description("Serviço relacionados a gestão de tickets")
						.termsOfService("")
						.license(
								new License()
									.name("Apache 2.0")
									.url("")))
				.addSecurityItem(new SecurityRequirement()
						.addList("Bearer Authentication"))
						.components(new Components()
								.addSecuritySchemes("Bearer Authentication", createAPIKeyScheme()));
	}

}