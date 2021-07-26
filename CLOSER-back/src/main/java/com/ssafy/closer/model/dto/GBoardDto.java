package com.ssafy.closer.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GBoardDto {
    private int Gboard_pk;
    private String userId;
    private String title;
    private String content;
    private Date create_at;
    private Date update_at;
    private int category;
}