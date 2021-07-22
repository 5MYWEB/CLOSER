package com.ssafy.closer.model.dto;

public class PostListDto {
    private String userId;
    private String title;
    private String created_at;
    private int category;
    private String imgUrl;
    private int likeCnt;
    private int CommentCnt;

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

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public int getLikeCnt() {
        return likeCnt;
    }

    public void setLikeCnt(int likeCnt) {
        this.likeCnt = likeCnt;
    }

    public int getCommentCnt() {
        return CommentCnt;
    }

    public void setCommentCnt(int commentCnt) {
        CommentCnt = commentCnt;
    }
}
