package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.BoardDto;
import com.ssafy.closer.model.dto.SearchDto;
import com.ssafy.closer.model.service.SearchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/search")
@Api("Search Controller API V1")
@CrossOrigin("*")
public class SearchController {
    private static final Logger logger = LoggerFactory.getLogger(SearchController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private SearchService searchService;

    // [최신순] 전체게시판 선택 시
    @ApiOperation(value = "[최신순] 전체게시판 선택 시")
    @GetMapping("/{keyword}/recent/{choice_pk}")
    public ResponseEntity recentSearchAll(@PathVariable String keyword, @PathVariable int choice_pk) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice_pk==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice_pk==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.recentSearchAll(searchDto), HttpStatus.OK);
    }

    // [인기순] 전체게시판 선택 시
    @ApiOperation(value = "[인기순] 전체게시판 선택 시")
    @GetMapping("/{keyword}/popular/{choice_pk}")
    public ResponseEntity popularSearchAll(@PathVariable String keyword, @PathVariable int choice_pk) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice_pk==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice_pk==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.popularSearchAll(searchDto), HttpStatus.OK);
    }

    // [최신순] 자취게시판(GBoard) 선택 시 - 한끼레시피 / 자취 팁 / 홈데코
    @ApiOperation(value = "[최신순] 자취게시판(GBoard) 선택 시")
    @GetMapping("/gboard/{keyword}/recent/{choice_pk}")
    public ResponseEntity recentSearchGboard(@PathVariable String keyword, @PathVariable int choice_pk) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice_pk==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice_pk==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.recentSearchGboard(searchDto), HttpStatus.OK);
    }

    // [인기순] 자취게시판(GBoard) 선택 시 - 한끼레시피 / 자취 팁 / 홈데코
    @ApiOperation(value = "[인기순] 자취게시판(GBoard) 선택 시")
    @GetMapping("/gboard/{keyword}/popular/{choice_pk}")
    public ResponseEntity popularSearchGboard(@PathVariable String keyword, @PathVariable int choice_pk) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice_pk==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice_pk==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.popularSearchGboard(searchDto), HttpStatus.OK);
    }

    // [최신순] 지역게시판(LBoard) 선택 시 - 공동구매 / 클로저 모임 / 도와주세요
    @ApiOperation(value = "[최신순] 지역게시판(LBoard) 선택 시")
    @GetMapping("/lboard/{keyword}/recent/{choice_pk}")
    public ResponseEntity recentSearchLboard(@PathVariable String keyword, @PathVariable int choice_pk) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice_pk==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice_pk==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.recentSearchLboard(searchDto), HttpStatus.OK);
    }

    // [인기순] 지역게시판(LBoard) 선택 시 - 공동구매 / 클로저 모임 / 도와주세요
    @ApiOperation(value = "[인기순] 지역게시판(LBoard) 선택 시")
    @GetMapping("/lboard/{keyword}/popular/{choice_pk}")
    public ResponseEntity popularSearchLboard(@PathVariable String keyword, @PathVariable int choice_pk) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice_pk==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice_pk==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.popularSearchLboard(searchDto), HttpStatus.OK);
    }

    // [최신순] 뉴스피드 선택 시
    @ApiOperation(value = "[최신순] 뉴스피드 선택 시")
    @GetMapping("/feed/{keyword}/recent/{choice_pk}")
    public ResponseEntity recentSearchFeed(@PathVariable String keyword, @PathVariable int choice_pk) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice_pk==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice_pk==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.recentSearchFeed(searchDto), HttpStatus.OK);
    }

    // [인기순] 뉴스피드 선택 시
    @ApiOperation(value = "[인기순] 뉴스피드 선택 시")
    @GetMapping("/feed/{keyword}/popular/{choice_pk}")
    public ResponseEntity popularSearchFeed(@PathVariable String keyword, @PathVariable int choice_pk) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice_pk==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice_pk==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.popularSearchFeed(searchDto), HttpStatus.OK);
    }

    // [최신순] 게시판(GBoard, LBoard) 중 한개 선택 시
    @ApiOperation(value = "[최신순] 게시판(GBoard, LBoard) 중 한개 선택 시")
    @GetMapping("/{kind_pk}/{keyword}/recent/{choice_pk}")
    public ResponseEntity recentSearchOne(@PathVariable int kind_pk, @PathVariable String keyword, @PathVariable int choice_pk) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKind_pk(kind_pk);
        searchDto.setKeyword(keyword);
        if(choice_pk==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice_pk==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.recentSearchOne(searchDto), HttpStatus.OK);
    }

    // [인기순] 게시판(GBoard, LBoard) 중 한개 선택 시
    @ApiOperation(value = "[인기순] 게시판(GBoard, LBoard) 중 한개 선택 시")
    @GetMapping("/{kind_pk}/{keyword}/popular/{choice_pk}")
    public ResponseEntity popularSearchOne(@PathVariable int kind_pk, @PathVariable String keyword, @PathVariable int choice_pk) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKind_pk(kind_pk);
        searchDto.setKeyword(keyword);
        if(choice_pk==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice_pk==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.popularSearchOne(searchDto), HttpStatus.OK);
    }

//    @ApiOperation(value = "네이버 api 검색")
//    @GetMapping("/{keyword}")
//    public ResponseEntity searchNaver(@PathVariable String keyword) {
//
//        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
//    }
}
