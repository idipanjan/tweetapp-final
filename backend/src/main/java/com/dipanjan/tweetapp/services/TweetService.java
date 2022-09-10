package com.dipanjan.tweetapp.services;

import com.dipanjan.tweetapp.entities.Tweet;
import com.dipanjan.tweetapp.payloads.TweetDto;

import java.util.List;

public interface TweetService {
    //create
    TweetDto createTweet(TweetDto tweetDto, String username);

    //delete
    void deleteTweetById(Integer tweetId);

    //update
    TweetDto updateTweet(TweetDto tweetDto, Integer tweetId);

    //get all tweets
    List<TweetDto> getAllTweet();

    //get tweet by id
    TweetDto getTweetById(Integer tweetId);

    //get all tweets by user id
    List<TweetDto> getTweetsByUserId(Integer userId);

    //get all tweets by user name
    List<TweetDto> getTweetsByUserName(String userName);

}
