package com.ssafy.closer.model.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class FeedDto {
    private int feed_pk; // 글번호 (pk)
    private String userId; // 작성자
    private String content; // 글 내용
    private Date create_at; // 글 작성일
    private Date update_at; // 글 수정일
    private String location; // 사용자 거주 위치

//    private int viewCnt; // 조회수 - 추후에 할 것 고려
//    private String secretYn; // 비밀글 여부 - 추후에 할 것 고려
    // ---------------------- < 추후 할 것 고려시 변경될 코드 > -----------------------------
    /*
    public FeedDto(int feed_pk, String userId, String title, String content, String create_at, String update_at, String location, int viewCnt, String secretYn) {
        this.feed_pk = feed_pk;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.create_at = create_at;
        this.update_at = update_at;
        this.location = location;
        this.viewCnt = viewCnt;
        this.secretYn = secretYn;
    }

     public int getFeed_pk() {
        return feed_pk;
    }

    public void setFeed_pk(int feed_pk) {
        this.feed_pk = feed_pk;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreate_at() {
        return create_at;
    }

    public void setCreate_at(String create_at) {
        this.create_at = create_at;
    }

    public String getUpdate_at() {
        return update_at;
    }

    public void setUpdate_at(String update_at) {
        this.update_at = update_at;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getViewCnt() {
        return viewCnt;
    }

    public void setViewCnt(int viewCnt) {
        this.viewCnt = viewCnt;
    }

    public String getSecretYn() {
        return secretYn;
    }

    public void setSecretYn(String secretYn) {
        this.secretYn = secretYn;
    }

     */
}