package com.ssafy.closer.model.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LikeMapper {

    // 좋아요
    void addLike(LikeDto likeDto);

    // 좋아요 취소
    void cancelLike(LikeDto likeDto);

    // 좋아요 유무
    int isLike(LikeDto likeDto);

    // 좋아요 갯수
    int countLike(LikeDto likeDto);

    // 해당 글이 삭제되면 관련된 행 삭제
    void deleteLike(LikeDto likeDto);

}
