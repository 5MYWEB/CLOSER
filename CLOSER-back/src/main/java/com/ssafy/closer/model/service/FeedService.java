package com.ssafy.closer.model.service;

import java.util.List;

public interface FeedService {
    public List<FeedDto> feedListAll(); // 피드 목록 - 전체
    public List<FeedDto> feedListNear(String location); // 피드 목록 - 동네
    public List<FeedDto> feedListFollow(String userId); // 피드 목록 - 팔로우
    public boolean createFeed(FeedDto feedDto); // 피드 생성
    public FeedDto readFeed(int feed_pk); // 피드 상세보기
    public boolean deleteFeed(int kind_pk, int board_pk); // 피드 삭제
    String findFeedUser(int feed_pk); // 해당 피드 글을 쓴 유저 id 찾기
}