package com.redthread.order.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="payment_attempts")
public class PaymentAttempt {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(optional=false) @JoinColumn(name="order_id")
  private Order order;
  private String provider;
  @Enumerated(EnumType.STRING) @Column(nullable=false)
  private PaymentStatus status;
  @Column(nullable=false) private Instant createdAt;
}