package com.emt.health_portal.service.impl;

import com.emt.health_portal.model.Drug;
import com.emt.health_portal.repository.DrugRepository;
import com.emt.health_portal.service.DrugService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DrugServiceImpl implements DrugService {
    private final DrugRepository drugRepository;

    public DrugServiceImpl(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
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
        drugRepository.deleteById(id);
    }
}
