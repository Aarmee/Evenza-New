package com.evenza.backend.controller;

import com.evenza.backend.model.Event;
import com.evenza.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    // Get all events
    @GetMapping
    public List<Event> getAllEvents(
            @RequestParam(required = false) String search // Optional search query
    ) {
        if (search != null) {
            return eventRepository.searchByKeyword(search); // Search by keyword (title or description)
        } else {
            return eventRepository.findAll(); // Return all events if no filters are applied
        }
    }

    // Get event by ID
    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id);
    }

    // Create a new event
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    // Update an event
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable String id, @RequestBody Event updatedEvent) {
        updatedEvent.setId(id);
        return eventRepository.save(updatedEvent);
    }

    // Delete an event
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
    }
}