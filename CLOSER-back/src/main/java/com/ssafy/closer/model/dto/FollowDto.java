package com.ssafy.closer.model.dto;

public class FollowDto {
    private int follow_pk;
    private String activeUser;
    private String passiveUser;

    private String nickname;
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
    public void setActiveUser(String activeUser) {
        this.activeUser = activeUser;
    }

    public String getPassiveUser() {
        return passiveUser;
    }
    public void setPassiveUser(String passiveUser) {
        this.passiveUser = passiveUser;
    }

    public int getFollow_pk() { return follow_pk; }
    public void setFollow_pk(int follow_pk) { this.follow_pk = follow_pk; }

    public String getNickname() {
        return nickname;
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfileImg() {
        return profileImg;
    }
    public void setProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }
}
