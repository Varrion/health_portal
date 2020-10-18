package com.emt.health_portal.model.dto;

import lombok.Data;

@Data
public class UserDto {
    String username;

    String password;

    String email;

    String firstName;

    String lastName;

    Boolean isCompanyOwner;
}
