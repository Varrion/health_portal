package com.emt.health_portal.repository;

import com.emt.health_portal.model.Company;
import com.emt.health_portal.model.Drug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

@Repository
public interface DrugRepository extends JpaRepository<Drug, Long> {

    @Transactional
    List<Drug> findAllByCategoryId(Long categoryId);

    @Transactional
    List<Drug> findAllByCompaniesIn(Set<Company> company);
}
