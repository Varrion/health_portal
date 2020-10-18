package com.emt.health_portal.service;

import com.emt.health_portal.model.User;
import com.emt.health_portal.model.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService extends BaseService<User, String>, UserDetailsService {

    User addUser(UserDto userDto, MultipartFile userPicture) throws IOException;

    User editUser(String username, UserDto userDto, MultipartFile userPicture) throws IOException;
}
