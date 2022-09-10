package com.dipanjan.tweetapp.services;

import com.dipanjan.tweetapp.payloads.CommentDto;

import java.util.List;

public interface CommentService {
    CommentDto createComment(CommentDto commentDto, Integer tweetId);

    void deleteComment(Integer commentId);

    List<CommentDto> getCommentsByTweetId(Integer tweetId);

}
