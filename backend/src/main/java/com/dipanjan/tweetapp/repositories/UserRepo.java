package com.dipanjan.tweetapp.repositories;

import com.dipanjan.tweetapp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.name like :key")
    User findByUserName(@Param("key") String userName);

    Optional<User> findByEmail(String email);

//    @Query("select u from User u where u.email=:email")
//    User findByName(@Param("email") String name);

}
