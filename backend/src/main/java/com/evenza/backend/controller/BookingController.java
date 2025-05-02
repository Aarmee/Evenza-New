package com.evenza.backend.controller;

import com.evenza.backend.model.Booking;
import com.evenza.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/booked-seats")
    public List<String> getBookedSeats() {
        return bookingRepository.findAll()
                .stream()
                .map(Booking::getSeatId)
                .collect(Collectors.toList());
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookSeats(@RequestBody List<String> seatIds) {
        List<String> alreadyBooked = seatIds.stream()
                .filter(bookingRepository::existsBySeatId)
                .collect(Collectors.toList());

        if (!alreadyBooked.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Some seats already booked: " + alreadyBooked);
        }

        List<Booking> newBookings = seatIds.stream()
                .map(seatId -> new Booking(null, seatId))
                .toList();

        bookingRepository.saveAll(newBookings);
        return ResponseEntity.ok("Booking successful");
    }
}

