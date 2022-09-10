package com.dipanjan.tweetapp.repositories;

import com.dipanjan.tweetapp.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment, Integer> {

}
