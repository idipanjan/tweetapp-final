package com.dipanjan.tweetapp.controllers;

import com.dipanjan.tweetapp.entities.Comment;
import com.dipanjan.tweetapp.payloads.ApiResponse;
import com.dipanjan.tweetapp.payloads.CommentDto;
import com.dipanjan.tweetapp.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins="*", allowedHeaders="*")
@RequestMapping("/api/v1/tweets")
@Secured("ROLE_USER")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/{tweetId}/comments")
    public ResponseEntity<CommentDto> createComment(@Valid @RequestBody CommentDto comment, @PathVariable Integer tweetId){
        CommentDto savedComment = commentService.createComment(comment, tweetId);
        return new ResponseEntity<CommentDto>(savedComment, HttpStatus.CREATED);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<ApiResponse> deleteComment(@PathVariable Integer commentId){
        commentService.deleteComment(commentId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Comment deleted successfully", true), HttpStatus.OK);
    }

    @GetMapping("/comments/{tweetId}")
    public ResponseEntity<List<CommentDto>> getCommentById(@PathVariable Integer tweetId){
        List<CommentDto> comments = commentService.getCommentsByTweetId(tweetId);
        return new ResponseEntity<List<CommentDto>>(comments, HttpStatus.OK);
    }
}
