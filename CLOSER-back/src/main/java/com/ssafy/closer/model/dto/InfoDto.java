package com.ssafy.closer.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners({AuditingEntityListener.class})
public class InfoDto {
    private int info_pk;
    private int board_pk;
    private int kind_pk; // 보드 분류 pk
    private String userId;

    private String reply;
    private String imgUrl;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime created_at;
}
