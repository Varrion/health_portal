package com.emt.health_portal.controller;

import com.emt.health_portal.model.Company;
import com.emt.health_portal.model.dto.CompanyDto;
import com.emt.health_portal.service.CompanyService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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

    @PostMapping
    Company addCompany(@RequestPart("companyDto") CompanyDto companyDto, @RequestPart("companyPicture") Optional<MultipartFile> companyPicture) throws IOException {
        return companyService.addCompany(companyDto, companyPicture.orElse(null));
    }

    @PutMapping("{id}")
    Company editCompany(@PathVariable Long id, @RequestPart("companyDto") CompanyDto companyDto, @RequestPart("companyPicture") Optional<MultipartFile> companyPicture) throws IOException {
        return companyService.editCompany(id,companyDto,companyPicture.orElse(null));
    }

    @DeleteMapping("{id}")
    void deleteCompanyDetails(@PathVariable Long id) {
        companyService.deleteById(id);
    }
}
