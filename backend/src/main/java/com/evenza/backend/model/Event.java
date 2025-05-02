package com.evenza.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
@Entity
@Table(name = "events")
public class Event{

    // Getters and Setters
    @Id
    private String id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate date;

    private LocalTime time;

    private String venue;

    private BigDecimal price;

    private String location;

    private String category;

    @Column(name="imageurl")
    private String imageurl;

}