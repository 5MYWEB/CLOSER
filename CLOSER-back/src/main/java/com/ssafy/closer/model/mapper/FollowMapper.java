package com.ssafy.closer.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.closer.model.dto.FollowDto;

import java.util.List;

@Mapper
public interface FollowMapper {
    // 팔로우
    void follow(FollowDto followDto);

    // 언팔로우
    void unfollow(FollowDto followDto);

    // 팔로우 유무
    int isFollow(FollowDto followDto);

    // 팔로잉 갯수
    int countActiveUser(FollowDto follow);
    
    // 팔로워 갯수
    int countPassiveUser(FollowDto followDto);

    // 팔로우 리스트 조회
    List<FollowDto> activeUserList(String passiveUser);

    // 팔로워 리스트 조회
    List<FollowDto> passiveUserList(String passiveUser);

}
