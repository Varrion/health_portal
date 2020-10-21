package com.emt.health_portal.service.impl;

import com.emt.health_portal.model.User;
import com.emt.health_portal.model.dto.UserDto;
import com.emt.health_portal.model.dto.UserLoginDto;
import com.emt.health_portal.repository.UserRepository;
import com.emt.health_portal.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(String id) {
        return userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Override
    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findById(s).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Override
    public User addUser(UserDto userDto, MultipartFile userPicture) throws IOException {
        User user = new User();

        if (userPicture != null) {
            user.setPicture(userPicture.getBytes());
        }

        user.setUsername(userDto.getUsername());
        user.setIsCompanyOwner(userDto.getIsCompanyOwner());

        mapDtoToEntityUser(user, userDto);
        return userRepository.save(user);
    }

    @Override
    public User editUser(String username, UserDto userDto, MultipartFile userPicture) throws IOException {
        User user = (User) loadUserByUsername(username);
        if (userPicture != null) {
            user.setPicture(userPicture.getBytes());
        }
        mapDtoToEntityUser(user, userDto);
        return userRepository.save(user);
    }

    @Override
    public User signInUser(UserLoginDto userDto) {
        return userRepository.getByUsernameAndPassword(userDto.getUsername(), userDto.getPassword()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private void mapDtoToEntityUser(User user, UserDto userDto) {
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
    }
}
