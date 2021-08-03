package com.ssafy.closer.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JoinDto {
    private int join_pk;
    private int board_pk;
    private String userId;

    public JoinDto(int board_pk, String userId){
        super();
        this.board_pk = board_pk;
        this.userId = userId;
    }
}
