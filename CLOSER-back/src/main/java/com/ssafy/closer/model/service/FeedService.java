package com.ssafy.closer.model.service;

import java.util.List;
import com.ssafy.closer.model.dto.FeedDto;

public interface FeedService {
    public List<FeedDto> FeedList(); // 피드 목록
    public boolean createFeed(FeedDto feedDto); // 피드 생성
    public FeedDto readFeed(int feed_pk); // 피드 상세보기
    public boolean deleteFeed(int feed_pk); // 피드 삭제

}