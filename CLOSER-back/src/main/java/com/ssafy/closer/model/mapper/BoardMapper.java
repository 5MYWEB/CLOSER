package com.ssafy.closer.model.mapper;

import com.ssafy.closer.model.dto.BoardDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    List<BoardDto> gBoardList(); // 자취 게시판 전체 인기글
    List<BoardDto> gBoardWeekBestList1(); // 자취 게시판 - 한끼레시피 한 주 인기글
    List<BoardDto> gBoardNewList1(); // 자취 게시판 - 한끼레시피 최신순
    List<BoardDto> gBoardBestList1(); // 자취 게시판 - 한끼레시피 인기글

    List<BoardDto> gBoardWeekBestList2(); // 자취 게시판 - 자취팁 한 주 인기글
    List<BoardDto> gBoardNewList2(); // 자취 게시판 - 자취팁 최신순
    List<BoardDto> gBoardBestList2(); // 자취 게시판 - 자취팁 인기글

    List<BoardDto> gBoardWeekBestList3(); // 자취 게시판 - 홈데코 한 주 인기글
    List<BoardDto> gBoardNewList3(); // 자취 게시판 - 자취팁 최신순
    List<BoardDto> gBoardBestList3(); // 자취 게시판 - 자취팁 인기글

    List<BoardDto> lBoardList1(String location); // 지역 게시판 - 공동구매 최신순
    List<BoardDto> lBoardList2(String location); // 지역 게시판 - 클로저모임 최신순
    List<BoardDto> lBoardList3(String location); // 지역 게시판 - 도와주세요 최신순
}
