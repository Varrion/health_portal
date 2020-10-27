package com.emt.health_portal.service.impl;

import com.emt.health_portal.model.Category;
import com.emt.health_portal.model.Company;
import com.emt.health_portal.model.Drug;
import com.emt.health_portal.model.dto.ChargeRequest;
import com.emt.health_portal.model.dto.DrugDto;
import com.emt.health_portal.model.enums.Illness;
import com.emt.health_portal.repository.DrugRepository;
import com.emt.health_portal.service.CategoryService;
import com.emt.health_portal.service.DrugService;
import com.emt.health_portal.service.StripeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class DrugServiceImpl implements DrugService, StripeService {
    private final DrugRepository drugRepository;
    private final CategoryService categoryService;

    @Value("${STRIPE_SECRET_KEY}")
    private String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    public DrugServiceImpl(DrugRepository drugRepository, CategoryService categoryService) {
        this.drugRepository = drugRepository;
        this.categoryService = categoryService;
    }

    @Override
    public List<Drug> findAll() {
        return drugRepository.findAll();
    }

    @Override
    public Drug findById(Long id) {
        return drugRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Override
    public void deleteById(Long id) {
        Drug drug = findById(id);
        for (Company company : drug.getCompanies()) {
            company.getDrugs().remove(drug);
        }

        drugRepository.deleteById(id);
    }

    @Override
    public Drug addDrug(DrugDto drugDto, MultipartFile drugPicture) throws IOException {
        Drug drug = new Drug();

        Category category = categoryService.findById(drugDto.getCategoryId());
        drug.setCategory(category);

        if (drugPicture != null) {
            drug.setPicture(drugPicture.getBytes());
        }

        mapDtoToEntityDrug(drug, drugDto);
        return drugRepository.save(drug);
    }

    @Override
    public Drug editDrug(Long id, DrugDto drugDto, MultipartFile drugPicture) throws IOException {
        Drug drug = findById(id);

        if (drugPicture != null) {
            drug.setPicture(drugPicture.getBytes());
        }

        mapDtoToEntityDrug(drug, drugDto);
        return drugRepository.save(drug);
    }

    @Override
    public List<Drug> getDrugsByCategory(Long categoryId) {
        return drugRepository.findAllByCategoryId(categoryId);
    }

    @Override
    public List<Drug> getDrugsByCompany(Set<Company> companySet) {
        return drugRepository.findAllByCompaniesIn(companySet);
    }

    private void mapDtoToEntityDrug(Drug drug, DrugDto drugDto) {
        drug.setName(drugDto.getName());
        drug.setDescription(drugDto.getDescription());
        drug.setPrice(drugDto.getPrice());
        drug.setQuantity(drugDto.getQuantity());
        drug.setValidFrom(drugDto.getValidFrom());
        drug.setValidTo(drugDto.getValidTo());
        Illness cure = Illness.valueOf(drugDto.getCures());
        drug.setCures(cure);
    }

    @Override
    public Charge charge(ChargeRequest chargeRequest) throws StripeException {
        Drug drug = findById(chargeRequest.getDrugId());

        if (drug.getQuantity() >= chargeRequest.getQuantity()) {
            drug.setQuantity(drug.getQuantity() - chargeRequest.getQuantity());

            Map<String, Object> chargeParams = new HashMap<>();
            chargeParams.put("amount", chargeRequest.getAmount());
            chargeParams.put("currency", "EUR");
            chargeParams.put("description", chargeRequest.getDescription());
            chargeParams.put("source", chargeRequest.getStripeToken());

            drugRepository.save(drug);
            return Charge.create(chargeParams);
        }

        return null;
    }
}
