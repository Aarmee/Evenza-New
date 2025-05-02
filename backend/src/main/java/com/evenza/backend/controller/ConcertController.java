package com.evenza.backend.controller;

import com.evenza.backend.model.Concert;
import com.evenza.backend.repository.ConcertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/concerts")
@CrossOrigin(origins = "http://localhost:5173") // Adjust if frontend runs on a different port
public class ConcertController {

    @Autowired
    private ConcertRepository concertRepository;

    @GetMapping
    public List<Concert> getAllConcerts() {
        return concertRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Concert> getConcertById(@PathVariable String id) {
        return concertRepository.findById(id);
    }
}

