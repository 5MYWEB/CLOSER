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
public class CommentDto {
    private int comment_pk;
    private int kind_pk; // 보드 분류 pk
    private int board_pk;
    private String reply;
    private String userId;
}
