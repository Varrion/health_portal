package com.emt.health_portal.repository;

import com.emt.health_portal.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    @Transactional
    Optional<Company> findByCompanyOwnerUsername(String username);
}
