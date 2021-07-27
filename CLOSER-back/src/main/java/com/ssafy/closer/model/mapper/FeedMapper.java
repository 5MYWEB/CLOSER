package com.ssafy.closer.model.mapper;

import com.ssafy.closer.model.dto.FeedDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FeedMapper {
    public List<FeedDto> feedListAll(); // 피드 목록 - 전체
    public List<FeedDto> feedListNear(String location); // 피드 목록 - 동네
    public List<FeedDto> feedListFollow(String userId); // 피드 목록 - 팔로우
    public boolean createFeed(FeedDto feedDto); // 피드 생성
    public FeedDto readFeed(int feed_pk); // 피드 상세보기
    public boolean deleteFeed(int feed_pk); // 피드 삭제

//    public boolean updateFeed(FeedDto feedDto);  // 피드 수정 안넣기로 했는데 혹시 필요할 수도 있으니 주석 처리해둠
//    public void increaseViewCnt(int feed_pk); // 나중에 조회수 필요할까봐
}