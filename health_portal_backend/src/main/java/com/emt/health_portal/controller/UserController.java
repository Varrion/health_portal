package com.emt.health_portal.controller;

import com.emt.health_portal.model.User;
import com.emt.health_portal.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    List<User> getAllUsers() {
        return this.userService.findAll();
    }

    @GetMapping("{id}")
    User getUserDetails(@PathVariable String id) {
        return this.userService.findById(id);
    }

    @DeleteMapping("{id}")
    void deleteUser(@PathVariable String id) {
        this.userService.deleteById(id);
    }
}
