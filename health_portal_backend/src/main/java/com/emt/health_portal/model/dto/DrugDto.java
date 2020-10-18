package com.emt.health_portal.model.dto;

import lombok.Data;

import java.util.Date;

@Data
public class DrugDto {
    String name;

    String description;

    Date validFrom;

    Date validTo;

    Integer price;

    Integer quantity;

    Long categoryId;

    String[] companies;

    String cures;
}
