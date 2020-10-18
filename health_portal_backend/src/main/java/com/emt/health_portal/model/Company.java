package com.emt.health_portal.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String name;

    String description;

    String address;

    String city;

    Date createdOn;

    @ManyToMany
    Set<Drug> drugs;

    @OneToOne
    @Column(nullable = false)
    User companyOwner;

    @Lob
    byte[] picture;
}
