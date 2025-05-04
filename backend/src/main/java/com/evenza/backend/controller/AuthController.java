package com.evenza.backend.controller;

import com.evenza.backend.model.User;
import com.evenza.backend.security.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (userService.findByEmail(user.getEmail()).isPresent()) {
                response.put("message", "Email already in use");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            User savedUser = userService.registerUser(user);
            response.put("message", "User registered successfully");
            response.put("user", savedUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("message", "An error occurred during registration");
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");

            if (email == null || password == null) {
                response.put("message", "Email and password are required");
                return ResponseEntity.badRequest().body(response);
            }

            Optional<User> userOpt = userService.authenticate(email, password);
            if (userOpt.isPresent()) {
                response.put("message", "Login successful");
                response.put("user", userOpt.get());
                return ResponseEntity.ok(response);
            }
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            response.put("message", "An error occurred during login");
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
