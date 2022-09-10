package com.dipanjan.tweetapp.services.impl;

import com.dipanjan.tweetapp.entities.Tweet;
import com.dipanjan.tweetapp.entities.User;
import com.dipanjan.tweetapp.exceptions.ResourceNotFoundException;
import com.dipanjan.tweetapp.payloads.TweetDto;
import com.dipanjan.tweetapp.repositories.TweetRepo;
import com.dipanjan.tweetapp.repositories.UserRepo;
import com.dipanjan.tweetapp.services.TweetService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.apache.catalina.util.ConcurrentDateFormat.GMT;

@Service
public class TweetServiceImpl implements TweetService {

    @Autowired
    private TweetRepo tweetRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public TweetDto createTweet(TweetDto tweetDto, String username) {
        //User user = userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User", "user Id", userId));

        User user  = userRepo.findByEmail(username).orElseThrow(()->new ResourceNotFoundException("User", "user Id " + username , 0));

        LocalDateTime addedDate = LocalDateTime.now(ZoneId.of("Asia/Kolkata"));
        Tweet tweet = dtoToTweet(tweetDto);
        tweet.setDescription(tweetDto.getDescription());
        tweet.setCreatedAtDate(addedDate.toString());
        tweet.setLastUpdatedDate(addedDate.toString());
        tweet.setUser(user);

        Tweet newTweet = tweetRepo.save(tweet);
        TweetDto newTweetDto  = tweetToDto(newTweet);
        return newTweetDto;
    }

    @Override
    public void deleteTweetById(Integer tweetId) {
        Tweet tweet = tweetRepo.findById(tweetId).orElseThrow(()->new ResourceNotFoundException("Tweet", "tweet Id", tweetId));
        tweetRepo.delete(tweet);
    }

    @Override
    public TweetDto updateTweet(TweetDto tweetDto, Integer tweetId) {

        Tweet tweet = tweetRepo.findById(tweetId).orElseThrow(()->new ResourceNotFoundException("Tweet", "tweet Id", tweetId));
        LocalDateTime updatedDate = LocalDateTime.now(ZoneId.of("Asia/Kolkata"));
        tweet.setDescription(tweetDto.getDescription());
        tweet.setCreatedAtDate(tweet.getCreatedAtDate());
        tweet.setLastUpdatedDate(updatedDate.toString());

        Tweet updatedTweet = tweetRepo.save(tweet);
        TweetDto updatedTweeTDto = tweetToDto(updatedTweet);
        return updatedTweeTDto;
    }

    @Override
    public List<TweetDto> getAllTweet() {
        List<Tweet> tweets = tweetRepo.findAll();
        List<TweetDto> tweetDtos = tweets.stream().map(tweet -> tweetToDto(tweet)).collect(Collectors.toList());
        return tweetDtos;
    }

    @Override
    public TweetDto getTweetById(Integer tweetId) {
        Tweet tweet = tweetRepo.findById(tweetId).orElseThrow(()->new ResourceNotFoundException("Tweet", "tweet Id", tweetId));
        TweetDto tweetDto = tweetToDto(tweet);
        return tweetDto;
    }

    @Override
    public List<TweetDto> getTweetsByUserId(Integer userId) {
        User user = userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User", "user Id", userId));
        List<Tweet> tweets = tweetRepo.findByUser(user);
        List<TweetDto> tweetDtos = tweets.stream().map(tweet -> tweetToDto(tweet)).collect(Collectors.toList());
        return tweetDtos;
    }

    @Override
    public List<TweetDto> getTweetsByUserName(String userName) {
        User user = userRepo.findByUserName(userName);
        List<Tweet> tweets= tweetRepo.findByUser(user);
        List<TweetDto> tweetDtos = tweets.stream().map(tweet -> modelMapper.map(tweet, TweetDto.class)).collect(Collectors.toList());
        return tweetDtos;
    }



    //helper functions
    public Tweet dtoToTweet(TweetDto tweetDto) {
        Tweet tweet = modelMapper.map(tweetDto, Tweet.class);
        return tweet;
    }

    public TweetDto tweetToDto(Tweet tweet){
        TweetDto tweetDto = modelMapper.map(tweet, TweetDto.class);
        return tweetDto;
    }
}
