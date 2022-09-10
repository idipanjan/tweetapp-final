package com.dipanjan.tweetapp.payloads;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class JtwAuthRequest {
    @Email(message ="Email address is not valid!! ")
    private String email;

    @NotEmpty
    @Size(min=6, max=20, message ="Password must be between 6 to 10 characters" )
    private String password;
}
