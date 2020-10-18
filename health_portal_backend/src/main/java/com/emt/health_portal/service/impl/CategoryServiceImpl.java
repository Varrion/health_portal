package com.emt.health_portal.service.impl;

import com.emt.health_portal.model.Category;
import com.emt.health_portal.model.dto.CategoryDto;
import com.emt.health_portal.repository.CategoryRepository;
import com.emt.health_portal.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Override
    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Category addCategory(CategoryDto categoryDto) {
        Category category = new Category();

        mapDtoToEntityCategory(category,categoryDto);
        return categoryRepository.save(category);
    }

    @Override
    public Category editCategory(Long id, CategoryDto categoryDto) {
        Category category = findById(id);
        mapDtoToEntityCategory(category, categoryDto);
        return categoryRepository.save(category);
    }

    private void mapDtoToEntityCategory(Category category, CategoryDto categoryDto) {
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
    }
}
