package com.emt.health_portal.controller;

import com.emt.health_portal.model.Drug;
import com.emt.health_portal.model.dto.ChargeRequest;
import com.emt.health_portal.model.dto.DrugDto;
import com.emt.health_portal.service.DrugService;
import com.emt.health_portal.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/drug")
public class DrugController {
    private final DrugService drugService;
    private final StripeService stripeService;

    public DrugController(DrugService drugService, StripeService stripeService) {
        this.drugService = drugService;
        this.stripeService = stripeService;
    }

    @GetMapping
    List<Drug> getAllDrugs() {
        return this.drugService.findAll();
    }

    @GetMapping("{id}")
    Drug getDrugDetails(@PathVariable Long id) {
        return this.drugService.findById(id);
    }

    @PostMapping
    Drug addDrug(@RequestPart("drugDto") DrugDto drugDto, @RequestPart("drugPicture") Optional<MultipartFile> drugPicture) throws IOException {
        return this.drugService.addDrug(drugDto, drugPicture.orElse(null));
    }

    @PutMapping("{id}")
    Drug editDrug(@PathVariable Long id, @RequestPart("drugDto") DrugDto drugDto, @RequestPart("drugPicture") Optional<MultipartFile> drugPicture) throws IOException {
        return this.drugService.editDrug(id, drugDto, drugPicture.orElse(null));
    }

    @DeleteMapping("{id}")
    void deleteDrug(@PathVariable Long id) {
        this.drugService.deleteById(id);
    }

    @PostMapping("/charge")
    public ResponseEntity charge(@RequestBody ChargeRequest chargeRequest) throws StripeException {
        Charge charge = stripeService.charge(chargeRequest);
        if (charge.getId() != null) {
            return new ResponseEntity(charge.getId(), HttpStatus.OK);
        }
        return new ResponseEntity("Error occurred", HttpStatus.BAD_REQUEST);
    }
}
