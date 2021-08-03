package com.ssafy.closer.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners({AuditingEntityListener.class})
public class AlarmDto {
    private int alarm_pk;
    private String userId; // 로그인한 사람
    private int category_pk; // 댓글1, 좋아요2, 북마크3, 팔로우4, 클로저봇5
    private String otherUserId; // 댓글 등을 남긴 사람
    private String content;
    private boolean visited;

    private int kind_pk; // 게시글 종류
    private int board_pk; // 게시글 pk
    private int bot_pk; // 봇 pk

    @CreatedDate
    @Column(updatable = false)
    private LocalDate created_at;
}
