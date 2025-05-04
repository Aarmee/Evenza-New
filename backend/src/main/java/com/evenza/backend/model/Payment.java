package com.evenza.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private String razorpayOrderId;
    @Setter
    private String razorpayPaymentId;
    @Setter
    private String razorpaySignature;

    @Setter
    private double amount;

    @Setter
    private String status; // "SUCCESS" or "FAIL"

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    // Getters and Setters

    // Optionally: Add toString(), equals(), hashCode() methods if needed
}




