package com.dipanjan.tweetapp.controllers;

import com.dipanjan.tweetapp.payloads.ApiResponse;
import com.dipanjan.tweetapp.payloads.UserDto;
import com.dipanjan.tweetapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins="*", allowedHeaders="*")
@RequestMapping("/api/v1/tweets/users")
@Secured("ROLE_USER")
public class UserController {

    @Autowired
    private UserService userService;

    //GET all users
    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    //GET user by id
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getSingleUser(@PathVariable Integer userId){
        UserDto user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    //Get user by email
    @GetMapping("/get/{email}")
    public ResponseEntity<UserDto> getSingleUserByEmail(@PathVariable String email){
        UserDto user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    //post -create user
    @PostMapping("/")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto){
        UserDto newUSer = userService.createUser(userDto);
        return new ResponseEntity<UserDto>(newUSer, HttpStatus.CREATED);
    }

    //PUT - update user
    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto, @PathVariable("userId") Integer uId){
        UserDto updatedUser = userService.updateUser(userDto, uId);
        return new ResponseEntity<UserDto>(updatedUser, HttpStatus.OK);
    }

    //DELETE - delete user
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> deleteUSer(@PathVariable("userId") Integer uId){
        userService.deleteUser(uId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("user deleted successfully", true), HttpStatus.OK);
    }


}
