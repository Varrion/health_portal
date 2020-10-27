package com.emt.health_portal.service;

import com.emt.health_portal.model.Company;
import com.emt.health_portal.model.Drug;
import com.emt.health_portal.model.dto.DrugDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface DrugService extends BaseService<Drug, Long> {

    Drug addDrug(DrugDto drugDto, MultipartFile drugPicture) throws IOException;

    Drug editDrug(Long id, DrugDto drugDto, MultipartFile drugPicture) throws IOException;

    List<Drug> getDrugsByCategory(Long categoryId);

    List<Drug> getDrugsByCompany(Set<Company> companySet);
}
