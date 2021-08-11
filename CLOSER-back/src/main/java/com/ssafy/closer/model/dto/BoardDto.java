package com.ssafy.closer.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners({AuditingEntityListener.class})
public class BoardDto {
    private int board_pk;
    private String userId;
    private int kind_pk;

    private String title;
    private String content;

    @CreatedDate
    @Column(updatable = false)
    private String created_at;

    @LastModifiedDate
    private String updated_at;

    private int totalNum;
    private int gatherNum;
    private String location;
    private int cnt;
    private int badge; // 어떤 카테고리에서 badge가 있는지 카테고리 넘버가 넘어감

    private String nickname;
}
