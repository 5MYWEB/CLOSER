package com.ssafy.closer.model.dto;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table
@EntityListeners(AuditingEntityListener.class)
public class FeedDto {
    private int feed_pk; // 글번호 (pk)
    private String userId; // 작성자
    private String content; // 글 내용

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime created_at; // 글 작성일

    private String location; // 사용자 거주 위치

//    private int viewCnt; // 조회수 - 추후에 할 것 고려
//    private String secretYn; // 비밀글 여부 - 추후에 할 것 고려
    // ---------------------- < 추후 할 것 고려시 변경될 코드 > -----------------------------
}