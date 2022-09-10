package com.dipanjan.tweetapp.payloads;

import lombok.Data;

import java.io.Serializable;

@Data
public class JwtAuthResponse implements Serializable {
	private final  String username;
	private final  String email;
	private final String token;

}