package com.evenza.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "movies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Movie {

    @Id
    private String id;

    private String title;

    private String description;

    @Column(columnDefinition = "json")
    private String genre;

    private LocalDate releasedate;

    private BigDecimal rating;
    @Column(name="imageurl")
    private String imageurl;

    private String duration;

    @Column(columnDefinition = "json")
    private String cast;

    private String director;

    private String language;

    private String price;

    private String location;
}
