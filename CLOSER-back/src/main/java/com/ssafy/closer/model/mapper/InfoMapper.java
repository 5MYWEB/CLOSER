package com.ssafy.closer.model.mapper;

import com.ssafy.closer.model.dto.InfoDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InfoMapper {
    // 좋아요, 북마크 추가
    int addInfo(InfoDto infoDto);

    // 좋아요, 북마크 취소
    int cancelInfo(InfoDto infoDto);

    // 좋아요, 북마크 유무
    int isClicked(InfoDto infoDto);

    // 좋아요, 북마크 갯수
    int countInfo(InfoDto infoDto);

    // 해당 글의 댓글 리스트들
    List<InfoDto> commentList(InfoDto infoDto);

    // 댓글 생성
    int createComment(InfoDto infoDto);

    // 댓글 삭제
    int deleteComment(int info_pk);

    // 해당 댓글을 쓴 유저 id 찾기
    String findCommentUser(int info_pk);
}
