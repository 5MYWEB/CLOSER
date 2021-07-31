package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.BoardDto;
import com.ssafy.closer.model.service.BoardService;
import com.ssafy.closer.model.service.FeedService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
@Api("Board Controller API V1")
@CrossOrigin("*")
public class BoardController {
    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private BoardService boardService;

    // 자취 게시판 메인
    @ApiOperation(value = "자취 게시판 cnt 많은 순으로 게시글 보여줌(완료)", response = List.class)
    @PostMapping("/gBoard/all")
    public ResponseEntity<List<BoardDto>> gBoardList() {
        logger.debug("인기많은 자취 게시글 - 호출");
        return new ResponseEntity<>(boardService.gBoardList(), HttpStatus.OK);
    }

    // 자취 게시판 - 한끼레시피 이번주 best
    @ApiOperation(value = "자취게시판 - 한끼레시피 한주 인기글(완료)", response = List.class)
    @PostMapping("/gBoard/recipe/weekbest")
    public ResponseEntity<List<BoardDto>> gBoardWeekBestList1() {
        logger.debug("한끼레시피 - 주간 인기");
        return new ResponseEntity<>(boardService.gBoardWeekBestList1(), HttpStatus.OK);
    }

    // 자취 게시판 - 한끼레시피 최신글
    @ApiOperation(value = "자취게시판 - 한끼레시피 최신글(완료)", response = List.class)
    @PostMapping("/gBoard/recipe/new")
    public ResponseEntity<List<BoardDto>> gBoardNewList1() {
        logger.debug("한끼레시피 - 최신");
        return new ResponseEntity<>(boardService.gBoardNewList1(), HttpStatus.OK);
    }

    // 자취 게시판 - 한끼레시피 인기글
    // todo. 현재 전체 기간 중 인기글로 되어있는데 today 기준으로 정렬 해야 함 (2021.08.03 수정 예정)
    // todo. cnt 인식 안되어서 현재 create_at desc 순으로 뜸 - 수정 예정 (2021.08.03)
    @ApiOperation(value = "자취게시판 - 한끼레시피 인기글", response = List.class)
    @PostMapping("/gBoard/recipe/best")
    public ResponseEntity<List<BoardDto>> gBoardBestList1() {
        logger.debug("한끼레시피 - 인기");
        return new ResponseEntity<>(boardService.gBoardBestList1(), HttpStatus.OK);
    }

    // 자취 게시판 - 자취팁 이번주 best
    @ApiOperation(value = "자취게시판 - 자취팁 한주 인기글", response = List.class)
    @PostMapping("/gBoard/tip/weekbest")
    public ResponseEntity<List<BoardDto>> gBoardWeekBestList2() {
        logger.debug("자취팁 - 주간 인기");
        return new ResponseEntity<>(boardService.gBoardWeekBestList2(), HttpStatus.OK);
    }

    // 자취 게시판 - 자취팁 최신글
    @ApiOperation(value = "자취게시판 - 자취팁 최신글(완료)", response = List.class)
    @PostMapping("/gBoard/tip/new")
    public ResponseEntity<List<BoardDto>> gBoardNewList2() {
        logger.debug("자취팁 - 최신");
        return new ResponseEntity<>(boardService.gBoardNewList2(), HttpStatus.OK);
    }

    // 자취 게시판 - 자취팁 인기글
    // todo. 현재 전체 기간 중 인기글로 되어있는데 today 기준으로 정렬 해야 함 (2021.08.03 수정 예정)
    @ApiOperation(value = "자취게시판 - 자취팁 인기글", response = List.class)
    @PostMapping("/gBoard/tip/best")
    public ResponseEntity<List<BoardDto>> gBoardBestList2() {
        logger.debug("자취팁 - 인기");
        return new ResponseEntity<>(boardService.gBoardBestList2(), HttpStatus.OK);
    }

    // 자취 게시판 - 홈데코 이번주 best
    @ApiOperation(value = "자취게시판 - 홈데코 한주 인기글", response = List.class)
    @PostMapping("/gBoard/deco/weekbest")
    public ResponseEntity<List<BoardDto>> gBoardWeekBestList3() {
        logger.debug("홈데코 - 주간 인기");
        return new ResponseEntity<>(boardService.gBoardWeekBestList3(), HttpStatus.OK);
    }

    // 자취 게시판 - 홈데코 최신글
    @ApiOperation(value = "자취게시판 - 홈데코 최신글", response = List.class)
    @PostMapping("/gBoard/deco/new")
    public ResponseEntity<List<BoardDto>> gBoardNewList3() {
        logger.debug("홈데코 - 최신");
        return new ResponseEntity<>(boardService.gBoardNewList3(), HttpStatus.OK);
    }

    // 자취 게시판 - 홈데코 인기글
    // todo. 현재 전체 기간 중 인기글로 되어있는데 today 기준으로 정렬 해야 함 (2021.08.03 수정 예정)
    @ApiOperation(value = "자취게시판 - 홈데코 인기글", response = List.class)
    @PostMapping("/gBoard/deco/best")
    public ResponseEntity<List<BoardDto>> gBoardBestList3() {
        logger.debug("홈데코 - 인기");
        return new ResponseEntity<>(boardService.gBoardBestList3(), HttpStatus.OK);
    }

    // 지역 게시판 - 공동구매 최신순
    @ApiOperation(value = "지역게시판 - 공동구매 최신글", response = List.class)
    @PostMapping("lboard/purchase")
    public ResponseEntity<List<BoardDto>> lBoardList1(@RequestParam String location) {
        logger.debug("공동구매 - 최신");
        return new ResponseEntity<>(boardService.lBoardList1(location), HttpStatus.OK);
    }

    // 자취 게시판 - 클로저모임 최신순
    @ApiOperation(value = "지역게시판 - 클로저모임 최신글", response = List.class)
    @PostMapping("lboard/getter")
    public ResponseEntity<List<BoardDto>> lBoardList2(@RequestParam String location) {
        logger.debug("클로저모임 - 최신");
        return new ResponseEntity<>(boardService.lBoardList2(location), HttpStatus.OK);
    }

    // 자취 게시판 - 도와주세요 최신술
    @ApiOperation(value = "지역게시판 - 도와주세요 최신글", response = List.class)
    @PostMapping("lboard/sos")
    public ResponseEntity<List<BoardDto>> lBoardList3(@RequestParam String location) {
        logger.debug("도와주세요 - 최신");
        return new ResponseEntity<>(boardService.lBoardList3(location), HttpStatus.OK);
    }

}
