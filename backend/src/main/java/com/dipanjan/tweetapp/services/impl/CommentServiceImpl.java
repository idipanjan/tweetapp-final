package com.dipanjan.tweetapp.services.impl;

import com.dipanjan.tweetapp.entities.Comment;
import com.dipanjan.tweetapp.entities.Tweet;
import com.dipanjan.tweetapp.exceptions.ResourceNotFoundException;
import com.dipanjan.tweetapp.payloads.CommentDto;
import com.dipanjan.tweetapp.repositories.CommentRepo;
import com.dipanjan.tweetapp.repositories.TweetRepo;
import com.dipanjan.tweetapp.services.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private TweetRepo tweetRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CommentDto createComment(CommentDto commentDto, Integer tweetId) {
        Tweet tweet = tweetRepo.findById(tweetId).orElseThrow(()->new ResourceNotFoundException("Tweet", "tweet id: ", tweetId));
        Comment comment = modelMapper.map(commentDto, Comment.class);
        comment.setTweet(tweet);
        Comment savedComment = commentRepo.save(comment);
        return modelMapper.map(savedComment, CommentDto.class);
    }

    @Override
    public void deleteComment(Integer commentId) {
        Comment com = commentRepo.findById(commentId).orElseThrow(()-> new ResourceNotFoundException("Comment", "comment id: ", commentId));
        commentRepo.delete(com);
    }

    @Override
    public List<CommentDto> getCommentsByTweetId(Integer tweetId) {
        Tweet tweet = tweetRepo.findById(tweetId).orElseThrow(()->new ResourceNotFoundException("Tweet", "tweet id: ", tweetId));
        List<Comment> comments = tweet.getComments();
        List<CommentDto> commentDtos = comments.stream().map((comment) -> modelMapper.map(comment, CommentDto.class)).collect(Collectors.toList());
        return commentDtos;
    }
}
