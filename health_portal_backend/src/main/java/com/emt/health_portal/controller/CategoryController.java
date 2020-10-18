package com.emt.health_portal.controller;

import com.emt.health_portal.model.Category;
import com.emt.health_portal.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    List<Category> getAllCategories() {
        return this.categoryService.findAll();
    }

    @GetMapping("{id}")
    Category getCategoryDetails(@PathVariable Long id) {
        return this.categoryService.findById(id);
    }

    @DeleteMapping("{id}")
    void deleteCategory(@PathVariable Long id) {
        this.categoryService.deleteById(id);
    }
}
