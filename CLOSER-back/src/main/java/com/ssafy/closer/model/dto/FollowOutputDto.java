package com.ssafy.closer.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowOutputDto {
    private boolean followed;
    private int following;
    private int follower;
}
