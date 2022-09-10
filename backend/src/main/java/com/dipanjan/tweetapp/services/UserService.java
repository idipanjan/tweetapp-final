package com.dipanjan.tweetapp.services;

import com.dipanjan.tweetapp.payloads.UserDto;

import java.util.List;

public interface UserService {

    //create
    UserDto createUser(UserDto userDto);

    //delete
    void deleteUser(Integer userId);

    //update
    UserDto updateUser(UserDto userDto, Integer userId);

    //get
    List<UserDto> getAllUsers();

    //getById
    UserDto getUserById(Integer userId);

    //getByEmail
    UserDto getUserByEmail(String email);

}
