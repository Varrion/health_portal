package com.emt.health_portal.repository;

import com.emt.health_portal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    @Transactional
    Optional<User> getByUsernameAndPassword(String username, String password);
}
