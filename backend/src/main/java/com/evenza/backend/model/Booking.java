package com.evenza.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String seatId;

    // Default constructor
    public Booking() {
    }

    // All-args constructor
    public Booking(Long id, String seatId) {
        this.id = id;
        this.seatId = seatId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSeatId() {
        return seatId;
    }

    public void setSeatId(String seatId) {
        this.seatId = seatId;
    }

    // Optional builder-like method
    public static BookingBuilder builder() {
        return new BookingBuilder();
    }

    public static class BookingBuilder {
        private Long id;
        private String seatId;

        public BookingBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public BookingBuilder seatId(String seatId) {
            this.seatId = seatId;
            return this;
        }

        public Booking build() {
            return new Booking(id, seatId);
        }
    }
}
