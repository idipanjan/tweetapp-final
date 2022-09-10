package com.dipanjan.tweetapp.controllers;

import com.dipanjan.tweetapp.security.JwtTokenService;
import com.dipanjan.tweetapp.payloads.JtwAuthRequest;
import com.dipanjan.tweetapp.payloads.JwtAuthResponse;
import com.dipanjan.tweetapp.payloads.UserDto;
import com.dipanjan.tweetapp.security.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/tweets/auth")
public class AuthController{

    private KafkaTemplate<String, String> kafkaTemplate;

    public AuthController(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenService jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody JtwAuthRequest authenticationRequest) throws Exception {

        final Authentication auth = authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

        SecurityContextHolder.getContext().setAuthentication(auth);

        kafkaTemplate.send("tweetapp", "user looged in ");

        return ResponseEntity.ok(new JwtAuthResponse(userDetailsService.getUserName(authenticationRequest.getEmail()), authenticationRequest.getEmail(), jwtTokenUtil.generateToken(auth)));
    }

    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@Valid @RequestBody UserDto user) throws Exception {
        kafkaTemplate.send("tweetapp", "new user registered");
        return ResponseEntity.ok(userDetailsService.save(user));
    }

    private Authentication authenticate(String username, String password) throws Exception {
        try {
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}