package com.emt.health_portal.service;

import com.emt.health_portal.model.Category;
import com.emt.health_portal.model.dto.CategoryDto;

public interface CategoryService extends BaseService<Category, Long> {
    Category addCategory(CategoryDto categoryDto);

    Category editCategory(Long id, CategoryDto categoryDto);
}
