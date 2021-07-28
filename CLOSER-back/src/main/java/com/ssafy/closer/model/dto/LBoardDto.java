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
public class LBoardDto {
    private int Lboard_pk;
    private String userId;
    private String title;
    private String content;

    @CreatedDate
    @Column(updatable = false)
    private Date create_at;

    @LastModifiedDate
    private Date update_at;

    private int category;
    private int totalnum;
    private int gathernum;
    private String location;
}
