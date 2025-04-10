package com.totvs.taskManager.infra.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // permite todas as rotas
                .allowedOrigins("*") // permite qualquer origem
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // permite esses métodos HTTP
                .allowedHeaders("*"); // permite qualquer header
    }
}