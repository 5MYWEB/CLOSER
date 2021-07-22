package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.FollowDto;

import java.util.List;

public interface FollowService {

    void follow(FollowDto follow);
    void unfollow(FollowDto follow);
    int isFollow(FollowDto follow);
    int countActiveUser(FollowDto follow);
    int countPassiveUser(FollowDto followDto);
    List<FollowDto> activeUserList(String passiveUser);
    List<FollowDto> passiveUserList(String passiveUser);
}
