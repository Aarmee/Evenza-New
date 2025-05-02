package com.evenza.backend.controller;

import com.evenza.backend.model.Sports;
import com.evenza.backend.repository.SportsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sports")
@CrossOrigin(origins = "http://localhost:5173")
public class SportsController {

    @Autowired
    private SportsRepository sportsRepository;

    // Get all sports
    @GetMapping
    public List<Sports> getAllSports() {
        return sportsRepository.findAll();
    }

    // Get sport by ID
    @GetMapping("/{id}")
    public ResponseEntity<Sports> getSportById(@PathVariable String id) {
        return sportsRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
