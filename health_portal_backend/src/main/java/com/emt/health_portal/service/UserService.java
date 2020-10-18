package com.emt.health_portal.service;

import com.emt.health_portal.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends BaseService<User, String>, UserDetailsService {
}
