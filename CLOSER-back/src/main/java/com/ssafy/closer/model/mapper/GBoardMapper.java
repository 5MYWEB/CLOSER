package com.ssafy.closer.model.mapper;

import com.ssafy.closer.model.dto.BoardDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GBoardMapper {
    List<BoardDto> ListAll(); // Gboard 목록
    int create(BoardDto boardDto); // Gboard 생성
    BoardDto read(int board_pk); // Gboard 상세보기
    int update(BoardDto boardDto); // Gboard 수정
    int delete(int board_pk); // Gboard 삭제
    String findUser(int board_pk); // 해당 Gboard 글을 쓴 유저 id 찾기
}
