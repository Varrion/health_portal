package com.emt.health_portal.controller;

import com.emt.health_portal.model.Company;
import com.emt.health_portal.service.CompanyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/company")
public class CompanyController {
    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping()
    List<Company> getAllCompanies() {
        return this.companyService.findAll();
    }

    @GetMapping("{id}")
    Company getCompanyDetails(@PathVariable Long id) {
        return this.companyService.findById(id);
    }

    @DeleteMapping("{id}")
    void deleteCompanyDetails(@PathVariable Long id) {
        companyService.deleteById(id);
    }
}
