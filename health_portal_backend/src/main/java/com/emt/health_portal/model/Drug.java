package com.emt.health_portal.model;

import com.emt.health_portal.model.enums.Illness;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
public class Drug {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String name;

    String description;

    @Column(nullable = false)
    Date validFrom;

    @Column(nullable = false)
    Date validTo;

    @Column(nullable = false)
    Integer price;

    @Column(nullable = false)
    Integer quantity;

    @ManyToOne
    Category category;

    @ManyToMany(mappedBy = "drugs")
    Set<Company> companies;

    @Enumerated(EnumType.STRING)
    Illness cures;

    @Lob
    byte[] picture;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Drug)) return false;
        Drug drug = (Drug) o;
        return getId().equals(drug.getId()) &&
                getName().equals(drug.getName()) &&
                Objects.equals(getDescription(), drug.getDescription()) &&
                getPrice().equals(drug.getPrice()) &&
                getQuantity().equals(drug.getQuantity());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getDescription(), getPrice(), getQuantity());
    }
}
