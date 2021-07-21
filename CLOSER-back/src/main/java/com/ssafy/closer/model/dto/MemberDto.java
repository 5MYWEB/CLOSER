package com.ssafy.closer.model.dto;

public class MemberDto {
    private String userId;
    private String nickname;
    private String password;
    private String email;
    private String addr;
    private String homeAlone;

    public MemberDto() {
        super();
    }

    public MemberDto(String userId, String nickname, String password, String email, String addr, String homeAlone) {
        super();
        this.userId = userId;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.addr = addr;
        this.homeAlone = homeAlone;
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

    public String getHomeAlone() {
        return homeAlone;
    }

    public void setHomeAlone(String homeAlone) {
        this.homeAlone = homeAlone;
    }

}
