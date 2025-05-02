package com.evenza.backend.repository;

import com.evenza.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    boolean existsBySeatId(String seatId);
}
