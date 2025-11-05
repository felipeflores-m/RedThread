package com.redthread.catalog.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.SecretKey;

@Configuration
public class SecurityConfig {

    // 1) Lee de application.yml (app.security.jwt.secret)
    // 2) Si no existe, usa la env var JWT_SECRET
    @Value("${app.security.jwt.secret:${JWT_SECRET:}}")
    private String jwtSecret;

    private SecretKey secretKey;

    @PostConstruct
    void init() {
        if (jwtSecret == null || jwtSecret.isBlank()) {
            throw new IllegalStateException("JWT secret no configurado. Define 'app.security.jwt.secret' en application.yml o la variable de entorno JWT_SECRET.");
        }
        this.secretKey = KeyUtils.hmacKey(jwtSecret); // HmacSHA256
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(reg -> reg
                .requestMatchers("/media/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        // HS256 se selecciona automáticamente con clave de 256 bits
        return NimbusJwtDecoder.withSecretKey(this.secretKey).build();
    }
}
