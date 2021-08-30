package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.InfoDto;

import java.util.List;

public interface InfoService {
    // 좋아요, 북마크 추가
    boolean addInfo(InfoDto infoDto);

    // 좋아요, 북마크 취소
    boolean cancelInfo(InfoDto infoDto);

    // 좋아요, 북마크 유무
    int isClicked(InfoDto infoDto);

    // 좋아요, 북마크 갯수
    int countInfo(InfoDto infoDto);

    // 해당 글의 댓글 리스트들
    List<InfoDto> commentList(InfoDto infoDto);

    // 댓글 생성
    boolean createComment(InfoDto infoDto);

    // 댓글 삭제
    boolean deleteComment(int info_pk);

    // 해당 댓글을 쓴 유저 id 찾기
    String findCommentUser(int info_pk);

    // 이미지 생성
    boolean addImage(InfoDto infoDto);

    // 이미지 조회
    List<String> detailImage(int board_pk);

    // 이미지 삭제
    boolean deleteImage(int board_pk);
}
