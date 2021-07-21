package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.FollowDto;

import java.util.List;

public interface FollowService {

    void follow(FollowDto follow);
    void unfollow(FollowDto follow);
    int isFollow(FollowDto follow);
    List<FollowDto> activeUserList(String activeUser);
    List<FollowDto> passiveUserList(String passiveUser);
}
