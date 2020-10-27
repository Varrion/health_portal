package com.emt.health_portal.service.impl;

import com.emt.health_portal.model.Company;
import com.emt.health_portal.model.Drug;
import com.emt.health_portal.model.User;
import com.emt.health_portal.model.dto.CompanyDto;
import com.emt.health_portal.repository.CompanyRepository;
import com.emt.health_portal.service.CompanyService;
import com.emt.health_portal.service.DrugService;
import com.emt.health_portal.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;
    private final UserService userService;
    private final DrugService drugService;

    public CompanyServiceImpl(CompanyRepository companyRepository, UserService userService, DrugService drugService) {
        this.companyRepository = companyRepository;
        this.userService = userService;
        this.drugService = drugService;
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
        User companyOwner = findById(id).getCompanyOwner();

        companyOwner.setHasCreatedCompany(false);
        userService.saveUser(companyOwner);

        companyRepository.deleteById(id);
    }

    @Override
    public Company findByCompanyOwner(String username) {
        return companyRepository.findByCompanyOwnerUsername(username).orElse(null);
    }

    @Override
    public Company addCompany(CompanyDto companyDto, MultipartFile companyPicture) throws IOException {
        Company company = new Company();

        User companyOwner = (User) userService.loadUserByUsername(companyDto.getCompanyOwner());
        companyOwner.setHasCreatedCompany(true);
        userService.saveUser(companyOwner);

        company.setCompanyOwner(companyOwner);

        if (companyPicture != null) {
            company.setPicture(companyPicture.getBytes());
        }
        mapDtoToEntityCompany(company, companyDto);
        return companyRepository.save(company);
    }

    @Override
    public Company editCompany(Long id, CompanyDto companyDto, MultipartFile companyPicture) throws IOException {
        Company company = findById(id);

        if (companyPicture != null) {
            company.setPicture(companyPicture.getBytes());
        }

        mapDtoToEntityCompany(company, companyDto);
        return companyRepository.save(company);
    }

    @Override
    public Company updateCompanyDrug(String username, Long drugId) {
        Company company = findByCompanyOwner(username);
        Drug drug = drugService.findById(drugId);
        Set<Drug> companyDrugs = company.getDrugs();
        if (companyDrugs.contains(drug)) {
            companyDrugs.remove(drug);
        } else {
            companyDrugs.add(drug);
        }

        company.setDrugs(companyDrugs);
        return companyRepository.save(company);
    }

    private void mapDtoToEntityCompany(Company company, CompanyDto companyDto) {
        company.setName(companyDto.getName());
        company.setDescription(companyDto.getDescription());
        company.setAddress(companyDto.getAddress());
        company.setCity(companyDto.getCity());
        company.setCreatedOn(companyDto.getCreatedOn());
    }
}
