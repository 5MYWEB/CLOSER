package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.SearchDto;
import com.ssafy.closer.model.service.SearchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
@Api("Search Controller API V1")
@CrossOrigin("*")
public class SearchController {
    private static final Logger logger = LoggerFactory.getLogger(FeedController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private SearchService searchService;

    // 1. 게시글 가져오기
    @ApiOperation(value = "검색된 글들을 반환한다.", response = List.class)
    @GetMapping("/list")
    public ResponseEntity<List<SearchDto>> searchList() throws Exception{
        logger.debug("검색결과 - 호출");
        return new ResponseEntity<>(searchService.searchList(), HttpStatus.OK);
    }
}
