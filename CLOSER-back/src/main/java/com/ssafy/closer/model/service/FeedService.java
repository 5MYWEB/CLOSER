package com.ssafy.closer.model.service;

import java.util.List;
import com.ssafy.closer.model.dto.FeedDto;

public interface FeedService {
    public List<FeedDto> feedListAll(); // 피드 목록 - 전체
    public List<FeedDto> feedListNear(String location); // 피드 목록 - 동네
    public List<FeedDto> feedListFollow(String userId); // 피드 목록 - 팔로우
    public boolean createFeed(FeedDto feedDto); // 피드 생성
    public FeedDto readFeed(int feed_pk); // 피드 상세보기
    public boolean deleteFeed(int feed_pk); // 피드 삭제

}