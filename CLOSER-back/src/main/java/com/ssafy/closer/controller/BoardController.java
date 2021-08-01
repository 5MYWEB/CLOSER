package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.BoardDto;
import com.ssafy.closer.model.dto.MemberDto;
import com.ssafy.closer.model.service.BoardService;
import com.ssafy.closer.model.service.FeedService;
import com.ssafy.closer.model.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/board")
@Api("Board Controller API V1")
@CrossOrigin("*")
public class BoardController {
    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private UserService userService;

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
    @ApiOperation(value = "자취게시판 - 자취팁 한주 인기글(완료)", response = List.class)
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
    @ApiOperation(value = "자취게시판 - 홈데코 한주 인기글(완료)", response = List.class)
    @PostMapping("/gBoard/deco/weekbest")
    public ResponseEntity<List<BoardDto>> gBoardWeekBestList3() {
        logger.debug("홈데코 - 주간 인기");
        return new ResponseEntity<>(boardService.gBoardWeekBestList3(), HttpStatus.OK);
    }

    // 자취 게시판 - 홈데코 최신글
    @ApiOperation(value = "자취게시판 - 홈데코 최신글(완료)", response = List.class)
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
    @ApiOperation(value = "지역게시판 - 공동구매 최신글(완료)", response = List.class)
    @PostMapping("lboard/purchase")
    public ResponseEntity<List<BoardDto>> lBoardList1(@RequestParam String location) {
        logger.debug("공동구매 - 최신");
        return new ResponseEntity<>(boardService.lBoardList1(location), HttpStatus.OK);
    }

    // 자취 게시판 - 클로저모임 최신순
    @ApiOperation(value = "지역게시판 - 클로저모임 최신글(완료)", response = List.class)
    @PostMapping("lboard/getter")
    public ResponseEntity<List<BoardDto>> lBoardList2(@RequestParam String location) {
        logger.debug("클로저모임 - 최신");
        return new ResponseEntity<>(boardService.lBoardList2(location), HttpStatus.OK);
    }

    // 자취 게시판 - 도와주세요 최신술
    @ApiOperation(value = "지역게시판 - 도와주세요 최신글(완료)", response = List.class)
    @PostMapping("lboard/sos")
    public ResponseEntity<List<BoardDto>> lBoardList3(@RequestParam String location) {
        logger.debug("도와주세요 - 최신");
        return new ResponseEntity<>(boardService.lBoardList3(location), HttpStatus.OK);
    }

    // 게시글 CRUD
    // 게시글 작성
    @ApiOperation(value="게시글 작성")
    @PostMapping()
    public ResponseEntity create(@RequestBody BoardDto boardDto) {
        // 로그인 유저의 정보 받아오기 (주소, 닉네임 찾기 위해서)
        MemberDto memberDto = userService.userInfo(boardDto.getUserId());

        // FeedDto 값 넣기
        boardDto.setCreated_at(LocalDateTime.now()); // 생성 시간
        boardDto.setUpdated_at(LocalDateTime.now()); // 수정 시간
        boardDto.setLocation(memberDto.getAddr()); // 주소
        boardDto.setNickname(memberDto.getNickname()); // 닉네임

        if(boardDto.getKind_pk() <= 3){ // Gboard인 경우
            if(boardService.gBoardCreate(boardDto)){ // 생성 성공한 경우
                return new ResponseEntity(SUCCESS, HttpStatus.OK);
            }
        }else if(boardDto.getKind_pk() <= 6){ // Lboard인 경우
            if(boardService.lBoardCreate(boardDto)){
                return new ResponseEntity(SUCCESS, HttpStatus.OK);
            }
        }else if(boardDto.getKind_pk() == 7){ // feed인 경우
            if(boardService.feedCreate(boardDto)){
                return new ResponseEntity(SUCCESS, HttpStatus.OK);
            }
        }
        return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
    }

    // 게시글 상세 보기
    @ApiOperation(value = "게시글 상세 보기")
    @GetMapping("/{board_pk}")
    public ResponseEntity detail(@PathVariable int board_pk) {
        try {
            return new ResponseEntity<BoardDto>(boardService.read(board_pk), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    // 게시글 수정
    @ApiOperation(value = "해당 게시글 수정")
    @PutMapping("/{board_pk}")
    public ResponseEntity<String> update(@PathVariable int board_pk, @RequestBody Map<String, String> info) {
        // 로그인한 유저와 해당 글을 쓴 유저가 같은지 확인해야함
        String userId = info.get("userId");
        String user = boardService.findUser(board_pk);

        if(userId.equals(user)){
            BoardDto boardDto = new BoardDto();
            boardDto.setBoard_pk(board_pk);
            boardDto.setTitle(info.get("title"));
            boardDto.setContent(info.get("content"));
            boardDto.setUpdated_at(LocalDateTime.now());

            int kind_pk = Integer.parseInt(info.get("kind_pk"));
            if (kind_pk <= 3){ // gboard인 경우
                boardDto.setUpdated_at(LocalDateTime.now());
                if(boardService.gBoardUpdate(boardDto)){ // 수정을 성공했다면
                    return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
                }
            }else if(kind_pk <= 6){ // lboard인 경우
                boardDto.setTotalnum(Integer.parseInt(info.get("totalNum")));
                if(boardService.lBoardUpdate(boardDto)){
                    return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    // 게시글 삭제
    @ApiOperation(value = "해당 게시글 삭제")
    @DeleteMapping("/{board_pk}")
    public ResponseEntity<String> delete(@PathVariable int board_pk, @RequestBody String userId) {
        // 로그인한 유저와 해당 글을 쓴 유저가 같은지 확인해야함
        String user = boardService.findUser(board_pk);
        if(userId.equals(user)){
            if(boardService.delete(board_pk)) { // 지우는 걸 성공한 경우
                return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
            }
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }




    // 게시글 사진 관련 (호영님이 aws 연결한 후에 하기로 함)
}
