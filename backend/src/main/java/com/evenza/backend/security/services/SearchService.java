package com.evenza.backend.security.services;

import com.evenza.backend.DTO.SearchResult;
import com.evenza.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class SearchService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private SportsRepository sportsRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ConcertRepository concertRepository;

    public List<SearchResult> searchAcrossAllCategories(String query) {
        List<SearchResult> results = new ArrayList<>();
        if (query == null || query.isBlank()) {
            return Collections.emptyList();
        }

        try {
            // Events
            eventRepository.searchByKeyword(query).forEach(event -> {
                SearchResult dto = new SearchResult();
                dto.setId(event.getId());
                dto.setTitle(event.getTitle());
                dto.setDescription(event.getDescription());
                dto.setVenue(event.getVenue());
                dto.setLocation(event.getLocation());
                dto.setImageurl(event.getImageurl());
                dto.setDate(event.getDate());
                dto.setTime(event.getTime());
                dto.setCategory("event");
                results.add(dto);
            });

            // Sports
            sportsRepository.searchByKeyword(query).forEach(sport -> {
                SearchResult dto = new SearchResult();
                dto.setId(sport.getId());
                dto.setTitle(sport.getTitle());
                dto.setVenue(sport.getVenue());
                dto.setImageurl(sport.getImageurl());

                // Convert String to LocalDate and LocalTime
                dto.setDate(LocalDate.parse(sport.getDate())); // Ensure the date string is in ISO-8601 format (e.g., "2023-10-01")
                dto.setTime(LocalTime.parse(sport.getTime())); // Ensure the time string is in ISO-8601 format (e.g., "14:30:00")

                dto.setCategory("sport");
                results.add(dto);
            });
            // Movies
            movieRepository.searchByKeyword(query).forEach(movie -> {
                SearchResult dto = new SearchResult();
                dto.setId(movie.getId());
                dto.setTitle(movie.getTitle());
                dto.setDescription(movie.getDescription());
                dto.setDuration(movie.getDuration());
                dto.setReleasedate(movie.getReleasedate());
                dto.setRating(movie.getRating());
                dto.setGenre(movie.getGenre());
                dto.setLanguage(movie.getLanguage());
                dto.setCast(movie.getCast());
                dto.setDirector(movie.getDirector());
                dto.setLocation(movie.getLocation());
                dto.setPrice(movie.getPrice());
                dto.setImageurl(movie.getImageurl());
                dto.setCategory("movie");
                results.add(dto);
            });

            // Concerts
            concertRepository.searchByKeyword(query).forEach(concert -> {
                SearchResult dto = new SearchResult();
                dto.setId(concert.getId());
                dto.setTitle(concert.getTitle());
                dto.setVenue(concert.getVenue());
                dto.setImageurl(concert.getImageurl());
                dto.setDate(concert.getDate());
                dto.setTime(concert.getTime());
                dto.setCategory("concert");
                results.add(dto);
            });

        } catch (Exception e) {
            System.err.println("Error during search: " + e.getMessage());
        }

        return results;
    }
}