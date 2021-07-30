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
    private Date created_at;

    @LastModifiedDate
    private Date updated_at;

    private int totalnum;
    private int gathernum;
    private String location;
    private int cnt;

    private String nickname;
}
