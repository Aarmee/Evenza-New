package com.evenza.backend.repository;

import com.evenza.backend.model.Sports;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SportsRepository extends JpaRepository<Sports, String> {

    @Query("SELECT s FROM Sports s WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(s.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Sports> searchByKeyword(@Param("query") String query);
}