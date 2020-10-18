package com.emt.health_portal.model.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CompanyDto {
    String name;

    String description;

    String address;

    String city;

    Date createdOn;

    String companyOwner;
}
