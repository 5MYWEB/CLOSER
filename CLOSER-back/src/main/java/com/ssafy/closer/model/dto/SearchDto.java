package com.ssafy.closer.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchDto {
    private int kind_pk; // 게시글 종류
    private boolean choice_pk; // true: 제목+내용, false: 작성자
    private String keyword; // 검색한 키워드
}
