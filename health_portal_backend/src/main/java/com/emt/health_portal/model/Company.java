package com.emt.health_portal.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
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
    User companyOwner;

    @Lob
    byte[] picture;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Company)) return false;
        Company company = (Company) o;
        return getId().equals(company.getId()) &&
                Objects.equals(getName(), company.getName()) &&
                Objects.equals(getDescription(), company.getDescription()) &&
                Objects.equals(getAddress(), company.getAddress()) &&
                Objects.equals(getCity(), company.getCity()) &&
                Objects.equals(getCreatedOn(), company.getCreatedOn()) &&
                getCompanyOwner().equals(company.getCompanyOwner());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getDescription(), getAddress(), getCity(), getCreatedOn(), getCompanyOwner());
    }
}
