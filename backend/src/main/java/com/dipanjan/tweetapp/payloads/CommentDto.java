package com.dipanjan.tweetapp.payloads;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
public class CommentDto {
    private int id;

    @NotEmpty
    @Size(min=6, message ="comment must be atleast 6 characters" )
    private String content;

    private String username;
}
