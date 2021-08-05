package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.BoardDto;
import com.ssafy.closer.model.dto.SearchDto;

import java.util.List;

public interface SearchService {
    List<BoardDto> recentSearchAll(SearchDto searchDto); // [최신순] 전체게시판 선택 시
    List<BoardDto> popularSearchAll(SearchDto searchDto); // [인기순] 전체게시판 선택 시
    List<BoardDto> recentSearchGboard(SearchDto searchDto); // [최신순] 자취게시판(GBoard) 선택 시 - 한끼레시피 / 자취 팁 / 홈데코
    List<BoardDto> popularSearchGboard(SearchDto searchDto); // [인기순] 자취게시판(GBoard) 선택 시 - 한끼레시피 / 자취 팁 / 홈데코
    List<BoardDto> recentSearchLboard(SearchDto searchDto); // [최신순] 지역게시판(LBoard) 선택 시 - 공동구매 / 클로저 모임 / 도와주세요
    List<BoardDto> popularSearchLboard(SearchDto searchDto); // [인기순] 지역게시판(LBoard) 선택 시 - 공동구매 / 클로저 모임 / 도와주세요
    List<BoardDto> recentSearchFeed(SearchDto searchDto); // [최신순] 뉴스피드(NewsFeed) 선택 시
    List<BoardDto> popularSearchFeed(SearchDto searchDto); // [인기순] 뉴스피드(NewsFeed) 선택 시
    List<BoardDto> recentSearchOne(SearchDto searchDto); // [최신순] 게시판(GBoard, LBoard) 중 한개 선택 시
    List<BoardDto> popularSearchOne(SearchDto searchDto); // [인기순] 게시판(GBoard, LBoard) 중 한개 선택 시
}
