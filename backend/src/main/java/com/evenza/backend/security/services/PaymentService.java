package com.evenza.backend.security.services;

import com.evenza.backend.config.RazorpayConfig;
import com.evenza.backend.model.Payment;
import com.evenza.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Map;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private RazorpayConfig razorpayConfig;

    public ResponseEntity<?> verifyAndSavePayment(Map<String, String> payload) {
        try {
            String orderId = payload.get("razorpay_order_id");
            String paymentId = payload.get("razorpay_payment_id");
            String signature = payload.get("razorpay_signature");
            double amount = Double.parseDouble(payload.get("amount"));

            String data = orderId + "|" + paymentId;
            String generatedSignature = hmacSha256(data, razorpayConfig.getKeySecret());

            boolean isValid = generatedSignature.equals(signature);

            Payment payment = new Payment();
            payment.setRazorpayOrderId(orderId);
            payment.setRazorpayPaymentId(paymentId);
            payment.setRazorpaySignature(signature);
            payment.setAmount(amount);
            payment.setStatus(isValid ? "SUCCESS" : "FAIL");

            paymentRepository.save(payment);

            return ResponseEntity.ok(Map.of("valid", isValid));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    private String hmacSha256(String data, String key) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(), "HmacSHA256");
        mac.init(secretKeySpec);
        byte[] hash = mac.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(hash);
    }
}
