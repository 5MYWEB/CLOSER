package com.ssafy.closer.model.mapper;

import com.ssafy.closer.model.dto.BoardDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FeedMapper {
//    List<BoardDto> ListAll(); // 피드 목록 - 전체
//    List<BoardDto> ListNear(String location); // 피드 목록 - 동네
//    List<BoardDto> ListFollow(String userId); // 피드 목록 - 팔로우
//    int create(BoardDto boardDto); // 피드 생성
//    BoardDto read(int board_pk); // 피드 상세보기
//    int delete(int board_pk); // 피드 삭제
//    String findUser(int board_pk); // 해당 피드 글을 쓴 유저 id 찾기

//    public boolean updateFeed(FeedDto feedDto);  // 피드 수정 안넣기로 했는데 혹시 필요할 수도 있으니 주석 처리해둠
//    public void increaseViewCnt(int feed_pk); // 나중에 조회수 필요할까봐
}