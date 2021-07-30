package com.ssafy.closer.model.service;

public interface LikeService {

    void addLike(LikeDto likeDto);
    void cancelLike(LikeDto likeDto);
    int isLike(LikeDto likeDto);
    int countLike(LikeDto likeDto);
    void deleteLike(LikeDto likeDto);
}
