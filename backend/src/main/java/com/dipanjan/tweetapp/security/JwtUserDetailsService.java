package com.dipanjan.tweetapp.security;

import com.dipanjan.tweetapp.entities.User;
import com.dipanjan.tweetapp.exceptions.UserExistsException;
import com.dipanjan.tweetapp.exceptions.ResourceNotFoundException;
import com.dipanjan.tweetapp.payloads.UserDto;
import com.dipanjan.tweetapp.repositories.UserRepo;
//import com.sma.security.dao.UserRepository;
//import com.sma.security.json.UserDTO;
//import com.sma.security.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepo userRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userRepository.findByEmail(username).orElseThrow(() -> new ResourceNotFoundException("User ", " email : " + username, 0));
		return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(),
				AuthorityUtils.createAuthorityList("ROLE_USER"));
	}
	
	public User save(UserDto user) throws UserExistsException {
		User existingUser = userRepository.findByEmail(user.getEmail()).orElse(null);

		if(existingUser != null){
			throw new UserExistsException("user already exists");
		}
		User newUser = new User();
		LocalDate joinedDate = LocalDate.now(ZoneId.of("Asia/Kolkata"));
		newUser.setName(user.getName().trim());
		newUser.setEmail(user.getEmail().trim());
		newUser.setDateOfBirth(user.getDateOfBirth());
		newUser.setJoinedDate(joinedDate.toString());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		return userRepository.save(newUser);
	}

	public String getUserName(String email){
		User existingUser = userRepository.findByEmail(email).orElse(null);
		return existingUser.getName();
	}
}