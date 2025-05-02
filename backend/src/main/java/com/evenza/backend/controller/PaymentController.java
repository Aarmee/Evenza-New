package com.evenza.backend.controller;
import com.evenza.backend.DTO.PaymentRequest;
import com.evenza.backend.config.RazorpayConfig;
import com.evenza.backend.security.services.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private RazorpayConfig razorpayConfig;

    @PostMapping("/create-order")
    public String createOrder(@RequestBody PaymentRequest paymentRequest) {
        try {
            RazorpayClient client = new RazorpayClient(
                    razorpayConfig.getKeyId(),
                    razorpayConfig.getKeySecret()
            );

            JSONObject options = new JSONObject();
            options.put("amount", paymentRequest.getAmount() * 100); // in paise
            options.put("currency", "INR");
            options.put("receipt", "receipt_" + System.currentTimeMillis());

            Order order = client.orders.create(options);
            return order.toString(); // Send order JSON to frontend
        } catch (Exception e) {
            return "{\"error\":\"" + e.getMessage() + "\"}";
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> payload) {
        return paymentService.verifyAndSavePayment(payload);
    }
}



