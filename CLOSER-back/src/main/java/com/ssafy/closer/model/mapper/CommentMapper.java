package com.ssafy.closer.model.mapper;

import com.ssafy.closer.model.dto.CommentDto;

import java.util.List;

public interface CommentMapper {

    // 해당 글의 댓글 리스트들
    List<CommentDto> commentList();

    // 댓글 생성
    void addComment(CommentDto commentDto);

    // 댓글 삭제
    void deleteComment(CommentDto commentDto);

    // 본인이 쓴 댓글인지 확인 여부
    int isComment(CommentDto commentDto);

    // 댓글 갯수
    int countComment(CommentDto commentDto);

    // 해당 글이 삭제되면 관련된 댓글 삭제
    void deleteAllComment(CommentDto commentDto);

}
