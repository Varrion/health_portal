package com.emt.health_portal.service;

import com.emt.health_portal.model.Company;
import com.emt.health_portal.model.dto.CompanyDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CompanyService extends BaseService<Company, Long> {

    Company findByCompanyOwner(String username);

    Company addCompany(CompanyDto companyDto, MultipartFile companyPicture) throws IOException;

    Company editCompany(Long id, CompanyDto companyDto, MultipartFile companyPicture) throws IOException;

    Company updateCompanyDrug(String username, Long drugId);
}
