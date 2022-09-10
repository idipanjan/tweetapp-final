package com.dipanjan.tweetapp.controllers;

import com.dipanjan.tweetapp.payloads.ApiResponse;
import com.dipanjan.tweetapp.payloads.TweetDto;
import com.dipanjan.tweetapp.services.TweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/tweets")
@Secured("ROLE_USER")
public class TweetController {

    private KafkaTemplate<String, String> kafkaTemplate;

    public TweetController(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Autowired
    private TweetService tweetService;

    //GET - get all tweets
    @GetMapping("/all")
    public ResponseEntity<List<TweetDto>> getAllTweets(){
        List<TweetDto> tweets = tweetService.getAllTweet();
       return ResponseEntity.ok(tweets);
    }

    //GET - get tweet by id
    @GetMapping("get/{tweetId}")
    public ResponseEntity<TweetDto> getTweetById(@PathVariable Integer tweetId){
        TweetDto tweetDto = tweetService.getTweetById(tweetId);
        return new ResponseEntity<TweetDto>(tweetDto, HttpStatus.OK);
    }

    //GET- get tweets by user id
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TweetDto>> getTweetsByUserId(@PathVariable Integer userId){
        List<TweetDto> tweets = tweetService.getTweetsByUserId(userId);
        return new ResponseEntity<List<TweetDto>>(tweets, HttpStatus.OK);
    }

    //GET- get tweets by user name
    @GetMapping("/{userName}")
    public ResponseEntity<List<TweetDto>> getTweetsByUserName(@PathVariable String userName){
        List<TweetDto> tweets = tweetService.getTweetsByUserName(userName);
        return new ResponseEntity<List<TweetDto>>(tweets, HttpStatus.OK);
    }


    //POST - create tweet
    @PostMapping("/{username}/add")
    public ResponseEntity<TweetDto> createTweet(@Valid @RequestBody TweetDto tweetDto, @PathVariable String username){
        TweetDto createdTweet  = tweetService.createTweet(tweetDto, username);
        kafkaTemplate.send("tweetapp", "new tweet created ");
        return new ResponseEntity<TweetDto>(createdTweet, HttpStatus.CREATED);
    }

    //PUT - update tweet
    @PutMapping("/update/{tweetId}")
    public ResponseEntity<TweetDto> upadteTweet(@Valid @RequestBody TweetDto tweetDto, @PathVariable Integer tweetId){
        TweetDto updatedTweet = tweetService.updateTweet(tweetDto, tweetId);
        kafkaTemplate.send("tweetapp", "Tweet updated with id " + tweetId);
        return new ResponseEntity<TweetDto>(updatedTweet,HttpStatus.OK);
    }

    //DELETE- delete tweet
    @DeleteMapping("/delete/{tweetId}")
    public ResponseEntity<ApiResponse> deletePostById(@PathVariable Integer tweetId){
        tweetService.deleteTweetById(tweetId);
        kafkaTemplate.send("tweetapp", "Tweet deleted with id " + tweetId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("tweet deleted succesfully", true), HttpStatus.OK);
    }


}
