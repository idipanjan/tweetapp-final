package com.dipanjan.tweetapp.payloads;

import com.dipanjan.tweetapp.entities.Comment;
import com.dipanjan.tweetapp.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TweetDto {
    private Integer id;

    @NotEmpty
    @Size(min = 10, message ="tweet description must be minimum of 10 characters")
    private String description;

    private String createdAtDate;

    private String lastUpdatedDate;

    private UserDto user;

    private List<CommentDto> comments;

}
