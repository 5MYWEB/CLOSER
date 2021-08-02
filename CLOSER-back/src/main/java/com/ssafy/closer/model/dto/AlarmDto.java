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
    private String otherUserId; // 댓글 등을 남긴 사람
    private String content;

    @CreatedDate
    @Column(updatable = false)
    private LocalDate created_at;

    private boolean visited;
}
