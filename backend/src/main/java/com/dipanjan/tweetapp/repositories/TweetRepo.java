package com.dipanjan.tweetapp.repositories;

import com.dipanjan.tweetapp.entities.Tweet;
import com.dipanjan.tweetapp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TweetRepo extends JpaRepository<Tweet, Integer> {

    List<Tweet> findByUser(User user);
}
