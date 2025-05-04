package com.evenza.backend.repository;

import com.evenza.backend.model.Concert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface ConcertRepository extends JpaRepository<Concert, String> {

    @Query("SELECT c FROM Concert c WHERE " +
            "LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(c.venue) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(c.location) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(c.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Concert> searchByKeyword(@Param("keyword") String keyword);
}
