package com.ssafy.closer.model.mapper;

import com.ssafy.closer.model.dto.BoardDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FeedMapper {
    public List<BoardDto> feedListAll(); // 피드 목록 - 전체
    public List<BoardDto> feedListNear(String location); // 피드 목록 - 동네
    public List<BoardDto> feedListFollow(String userId); // 피드 목록 - 팔로우
//    public boolean createFeed(BoardDto feedDto); // 피드 생성
//    public BoardDto readFeed(int feed_pk); // 피드 상세보기
//    public boolean deleteFeed(int kind_pk, int board_pk); // 피드 삭제
//    public String findFeedUser(int feed_pk); // 해당 피드 글을 쓴 유저 id 찾기
}