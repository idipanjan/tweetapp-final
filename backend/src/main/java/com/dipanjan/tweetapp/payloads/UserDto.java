package com.dipanjan.tweetapp.payloads;

import com.dipanjan.tweetapp.entities.Tweet;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {

    private Integer id;

    @NotEmpty
    @Size(min = 4, message ="Username must be minimum of 4 characters")
    private String name;

    @Email(message ="Email address is not valid!! ")
    private String email;

    @NotEmpty
    private String dateOfBirth;

    private String joinedDate;

    @NotEmpty
    @Size(min=6, max=20, message ="Password must be between 6 to 10 characters" )
    private String password;
}
