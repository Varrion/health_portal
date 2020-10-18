package com.emt.health_portal.service.impl;

import com.emt.health_portal.model.Company;
import com.emt.health_portal.repository.CompanyRepository;
import com.emt.health_portal.service.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    @Override
    public Company findById(Long id) {
        return companyRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Override
    public void deleteById(Long id) {
        companyRepository.deleteById(id);
    }
}
