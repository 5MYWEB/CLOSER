package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.BoardDto;
import com.ssafy.closer.model.dto.SearchDto;
import com.ssafy.closer.model.service.SearchNaverService;
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

    @Autowired
    private SearchNaverService searchNaverService;

    // 네이버 검색
    @Autowired(required = false)
    public SearchController(SearchNaverService searchNaverService) {
        this.searchNaverService = searchNaverService;
    }

    @ApiOperation(value = "네이버 검색")
    @RequestMapping(value="", method=RequestMethod.GET, produces="application/json; charset=UTF-8")
    @ResponseBody
    public String getApi(@RequestParam(defaultValue = "") String keyword) {
        return searchNaverService.findKeyword(keyword);
    }

    // [최신순] 전체게시판 선택 시
    @ApiOperation(value = "[최신순] 전체게시판 선택 시")
    @GetMapping("/recent")
    public ResponseEntity recentSearchAll(@RequestParam String keyword, @RequestParam int choice) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.recentSearchAll(searchDto), HttpStatus.OK);
    }

    // [인기순] 전체게시판 선택 시
    @ApiOperation(value = "[인기순] 전체게시판 선택 시")
    @GetMapping("/popular")
    public ResponseEntity popularSearchAll(@RequestParam String keyword, @RequestParam int choice) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.popularSearchAll(searchDto), HttpStatus.OK);
    }

    // [최신순] 자취게시판(GBoard) 선택 시 - 한끼레시피 / 자취 팁 / 홈데코
    @ApiOperation(value = "[최신순] 자취게시판(GBoard) 선택 시")
    @GetMapping("/gboard/recent")
    public ResponseEntity recentSearchGboard(@RequestParam String keyword, @RequestParam int choice) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.recentSearchGboard(searchDto), HttpStatus.OK);
    }

    // [인기순] 자취게시판(GBoard) 선택 시 - 한끼레시피 / 자취 팁 / 홈데코
    @ApiOperation(value = "[인기순] 자취게시판(GBoard) 선택 시")
    @GetMapping("/gboard/popular")
    public ResponseEntity popularSearchGboard(@RequestParam String keyword, @RequestParam int choice) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.popularSearchGboard(searchDto), HttpStatus.OK);
    }

    // [최신순] 지역게시판(LBoard) 선택 시 - 공동구매 / 클로저 모임 / 도와주세요
    @ApiOperation(value = "[최신순] 지역게시판(LBoard) 선택 시")
    @GetMapping("/lboard/recent")
    public ResponseEntity recentSearchLboard(@RequestParam String keyword, @RequestParam int choice) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.recentSearchLboard(searchDto), HttpStatus.OK);
    }

    // [인기순] 지역게시판(LBoard) 선택 시 - 공동구매 / 클로저 모임 / 도와주세요
    @ApiOperation(value = "[인기순] 지역게시판(LBoard) 선택 시")
    @GetMapping("/lboard/popular")
    public ResponseEntity popularSearchLboard(@RequestParam String keyword, @RequestParam int choice) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.popularSearchLboard(searchDto), HttpStatus.OK);
    }

    // [최신순] 뉴스피드 선택 시
    @ApiOperation(value = "[최신순] 뉴스피드 선택 시")
    @GetMapping("/feed/recent")
    public ResponseEntity recentSearchFeed(@RequestParam String keyword, @RequestParam int choice) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.recentSearchFeed(searchDto), HttpStatus.OK);
    }

    // [인기순] 뉴스피드 선택 시
    @ApiOperation(value = "[인기순] 뉴스피드 선택 시")
    @GetMapping("/feed/popular")
    public ResponseEntity popularSearchFeed(@RequestParam String keyword, @RequestParam int choice) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKeyword(keyword);
        if(choice==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.popularSearchFeed(searchDto), HttpStatus.OK);
    }

    // [최신순] 게시판(GBoard, LBoard) 중 한개 선택 시
    @ApiOperation(value = "[최신순] 게시판(GBoard, LBoard) 중 한개 선택 시")
    @GetMapping("/{kind_pk}/recent")
    public ResponseEntity recentSearchOne(@PathVariable int kind_pk, @RequestParam String keyword, @RequestParam int choice) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKind_pk(kind_pk);
        searchDto.setKeyword(keyword);
        if(choice==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.recentSearchOne(searchDto), HttpStatus.OK);
    }

    // [인기순] 게시판(GBoard, LBoard) 중 한개 선택 시
    @ApiOperation(value = "[인기순] 게시판(GBoard, LBoard) 중 한개 선택 시")
    @GetMapping("/{kind_pk}/popular")
    public ResponseEntity popularSearchOne(@PathVariable int kind_pk, @RequestParam String keyword, @RequestParam int choice) throws Exception{
        SearchDto searchDto = new SearchDto();
        searchDto.setKind_pk(kind_pk);
        searchDto.setKeyword(keyword);
        if(choice==1) searchDto.setChoice_pk(true); // 제목+내용
        else if(choice==2) searchDto.setChoice_pk(false); // 닉네임
        else return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);

        return new ResponseEntity<List<BoardDto>>(searchService.popularSearchOne(searchDto), HttpStatus.OK);
    }

}
