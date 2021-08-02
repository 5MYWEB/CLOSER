package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.BoardDto;

import java.util.List;

public interface BoardService {
    public List<BoardDto> gBoardList(); // 자취 게시판 전체 인기글
    public List<BoardDto> gBoardWeekBestList1(); // 자취 게시판 - 한끼레시피 한 주 인기글
    public List<BoardDto> gBoardNewList1(); // 자취 게시판 - 한끼레시피 최신순
    public List<BoardDto> gBoardBestList1(); // 자취 게시판 - 한끼레시피 인기글

    public List<BoardDto> gBoardWeekBestList2(); // 자취 게시판 - 자취팁 한 주 인기글
    public List<BoardDto> gBoardNewList2(); // 자취 게시판 - 자취팁 최신순
    public List<BoardDto> gBoardBestList2(); // 자취 게시판 - 자취팁 인기글

    public List<BoardDto> gBoardWeekBestList3(); // 자취 게시판 - 홈데코 한 주 인기글
    public List<BoardDto> gBoardNewList3(); // 자취 게시판 - 자취팁 최신순
    public List<BoardDto> gBoardBestList3(); // 자취 게시판 - 자취팁 인기글

    public List<BoardDto> lBoardList1(String location); // 지역 게시판 - 공동구매 최신순
    public List<BoardDto> lBoardList2(String location); // 지역 게시판 - 클로저모임 최신순
    public List<BoardDto> lBoardList3(String location); // 지역 게시판 - 도와주세요 최신순

    boolean gBoardCreate(BoardDto boardDto); // gboard 생성
    boolean lBoardCreate(BoardDto boardDto); // lboard 생성
    boolean feedCreate(BoardDto boardDto); // feed 생성

    BoardDto read(int board_pk); // gboard, lboard, feed 상세보기

    boolean gBoardUpdate(BoardDto boardDto); // Gboard 수정
    boolean lBoardUpdate(BoardDto boardDto); // Lboard 수정

    boolean delete(int board_pk); // gboard, lboard, feed 삭제

    String findUser(int board_pk); // 해당 gboard, lboard, feed 글을 쓴 유저 id 찾기

    boolean increaseCount(int board_pk); // 좋아요 or 북마크 클릭 시 갯수 증가
    boolean decreaseCount(int board_pk); // 좋아요 or 북마크 취소 시 갯수 감소
}
