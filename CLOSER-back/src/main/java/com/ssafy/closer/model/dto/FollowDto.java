package com.ssafy.closer.model.dto;

import java.util.Date;

public class FollowDto {
    private int follow_pk;
    private String activeUser;
    private String passiveUser;

    private String activeUserNickname;
    private String passiveUserNickname;

    private String profileImg;

    public FollowDto() {
        super();
    }

    public FollowDto(String activeUser, String passiveUser){
        super();
        this.activeUser = activeUser;
        this.passiveUser = passiveUser;
    }

    public String getActiveUser() {
        return activeUser;
    }

    public void setActiveUser(String passiveUser) {
        this.activeUser = activeUser;
    }

    public String getPassiveUser() {
        return passiveUser;
    }

    public void setPassiveUser(String passiveUser) {
        this.passiveUser = passiveUser;
    }
}
