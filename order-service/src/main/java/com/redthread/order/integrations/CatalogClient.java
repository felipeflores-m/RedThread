package com.redthread.order.integrations;

import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CatalogClient {

  private final WebClient catalogWebClient;

  private String currentToken() {
    var auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null && auth.getPrincipal() instanceof Jwt jwt) {
      return jwt.getTokenValue();
    }
    return null;
  }

  public record VariantInfo(Long id, BigDecimal price, Integer availableStock) {}

  public VariantInfo getVariant(Long variantId) {
    String token = currentToken();
    try {
      Map<String,Object> m = catalogWebClient.get()
          .uri("/variants/{id}", variantId)
          .headers(h -> { if (token != null) h.setBearerAuth(token); })
          .accept(MediaType.APPLICATION_JSON)
          .retrieve()
          .bodyToMono(Map.class)
          .block();
      if (m == null) return null;
      BigDecimal price = new BigDecimal(String.valueOf(m.getOrDefault("price", "0")));
      Integer stock = Integer.valueOf(String.valueOf(m.getOrDefault("availableStock", "0")));
      return new VariantInfo(variantId, price, stock);
    } catch (Exception ex) {
      return null; // si no existe endpoint, seguimos sin validar previa
    }
  }

  public void adjustStock(Long variantId, int delta) {
    String token = currentToken();
    catalogWebClient.post()
        .uri("/inventory/adjust")
        .headers(h -> { if (token != null) h.setBearerAuth(token); })
        .contentType(MediaType.APPLICATION_JSON)
        .bodyValue(Map.of("variantId", variantId, "delta", delta))
        .retrieve()
        .onStatus(s -> s.is4xxClientError() || s.is5xxServerError(),
            resp -> resp.bodyToMono(String.class).flatMap(msg -> Mono.error(new IllegalStateException("Catalog adjust error: " + msg))))
        .toBodilessEntity()
        .block();
  }
}