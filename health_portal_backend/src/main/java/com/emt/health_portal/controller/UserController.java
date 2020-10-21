package com.emt.health_portal.controller;

import com.emt.health_portal.model.User;
import com.emt.health_portal.model.dto.UserDto;
import com.emt.health_portal.model.dto.UserLoginDto;
import com.emt.health_portal.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    List<User> getAllUsers() {
        return this.userService.findAll();
    }

    @PostMapping
    User signUpUser(@RequestPart("userDto") UserDto userDto, @RequestPart("userPicture") Optional<MultipartFile> userPicture) throws IOException {
        return userService.addUser(userDto, userPicture.orElse(null));
    }

    @PostMapping("login")
    User signInUser(@RequestBody UserLoginDto userLoginDto) {
        return userService.signInUser(userLoginDto);
    }

    @GetMapping("{username}")
    User getUserDetails(@PathVariable String username) {
        return (User) this.userService.loadUserByUsername(username);
    }

    @PutMapping("{username}")
    User editUserDetails(@PathVariable String username, @RequestPart("userDto") UserDto userDto, @RequestPart("userPicture") Optional<MultipartFile> userPicture) throws IOException {
        return userService.editUser(username, userDto, userPicture.orElse(null));
    }

    @DeleteMapping("{username}")
    void deleteUser(@PathVariable String username) {
        this.userService.deleteById(username);
    }
}
