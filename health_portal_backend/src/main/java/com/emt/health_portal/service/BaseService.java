package com.emt.health_portal.service;

import java.util.List;

public interface BaseService<T, K> {
    List<T> findAll();

    T findById(K id);

    void deleteById(K id);
}
