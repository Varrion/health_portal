package com.emt.health_portal.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String name;

    String description;

    @OneToMany(mappedBy = "category")
    Set<Drug> drugs;
}
