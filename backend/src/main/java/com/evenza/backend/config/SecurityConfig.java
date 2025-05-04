package com.evenza.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                        .requestMatchers(("/api/events/**")).permitAll() // ✅ This now properly applies
                        .requestMatchers("/api/vimeo/oembed").permitAll() // ✅ This now properly applies
                        .requestMatchers("/api/movies/**").permitAll() // ✅ This now properly applies
                        .requestMatchers("/api/sports/**").permitAll() // ✅ This now properly applies
                        .requestMatchers(("/api/concerts/**")).permitAll() // ✅ This now properly applies
                        .requestMatchers("/api/payment/**").permitAll()
                        .requestMatchers("/api/search/**").permitAll()
                        .anyRequest().authenticated() // ✅ This now properly applies
                );

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}