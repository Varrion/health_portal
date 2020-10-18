package com.emt.health_portal.controller;
import com.emt.health_portal.model.Drug;
import com.emt.health_portal.service.DrugService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/drug")
public class DrugController {
    private final DrugService drugService;

    public DrugController(DrugService drugService) {
        this.drugService = drugService;
    }

    @GetMapping
    List<Drug> getAllDrugs() {
        return this.drugService.findAll();
    }

    @GetMapping("{id}")
    Drug getDrugDetails(@PathVariable Long id) {
        return this.drugService.findById(id);
    }

    @DeleteMapping("{id}")
    void deleteDrug(@PathVariable Long id) {
        this.drugService.deleteById(id);
    }
}
