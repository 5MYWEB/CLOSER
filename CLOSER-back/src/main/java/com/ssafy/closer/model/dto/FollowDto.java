package com.ssafy.closer.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FollowDto {
    private int follow_pk;
    private String activeUser;
    private String passiveUser;
    private String nickname;
    private String profileImg;

    public FollowDto(String activeUser, String passiveUser){
        super();
        this.activeUser = activeUser;
        this.passiveUser = passiveUser;
    }
}

