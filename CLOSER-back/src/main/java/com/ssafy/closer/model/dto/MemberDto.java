package com.ssafy.closer.model.dto;

public class MemberDto {
    private String userId;
    private String nickname;
    private String password;
    private String email;
    private String addr;
    private Integer homeAlone;
    private String intro;
    private String profileImg;
    private String phone;

    public MemberDto() {
        super();
    }

    public MemberDto(String userId, String nickname, String password, String email, String addr, Integer homeAlone, String intro, String profileImg, String phone) {

        super();
        this.userId = userId;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.addr = addr;
        this.homeAlone = homeAlone;
        this.intro = intro;
        this.profileImg = profileImg;
        this.phone = phone;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }


    public Integer getHomeAlone() {
        return homeAlone;
    }

    public void setHomeAlone(Integer homeAlone) {
        this.homeAlone = homeAlone;
    }

    public String getIntro(){
        return intro;
    }

    public void setIntro(String intro){
        this.intro = intro;
    }

    public String getProfileImg(){
        return profileImg;
    }

    public void setProfileImg(String profileImg){
        this.profileImg = profileImg;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}
