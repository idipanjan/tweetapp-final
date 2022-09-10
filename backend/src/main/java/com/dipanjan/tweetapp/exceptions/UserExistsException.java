package com.dipanjan.tweetapp.exceptions;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserExistsException extends RuntimeException{
    private String message;

    public UserExistsException(String message)
    {
        super();
        this.message = message;
    }
}
