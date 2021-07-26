package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.CommentDto;

public interface CommentService {
    void addComment(CommentDto commentDto);
    void deleteComment(CommentDto commentDto);
    int isComment(CommentDto commentDto);
    int countComment(CommentDto commentDto);
    void deleteAllComment(CommentDto commentDto);
}
