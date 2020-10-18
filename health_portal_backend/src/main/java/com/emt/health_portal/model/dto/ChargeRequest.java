package com.emt.health_portal.model.dto;

import lombok.Data;

@Data
public class ChargeRequest {
    String description;

    String stripeEmail;

    String stripeToken;

    Long drugId;

    Integer amount;

    Integer quantity;
}
