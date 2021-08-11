package com.ssafy.closer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.closer.model.dto.*;
import com.ssafy.closer.model.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/board")
@Api("Board Controller API V1")
@CrossOrigin("*")
public class BoardController {
    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private UserService userService;

    @Autowired
    private BoardService boardService;

    @Autowired
    private InfoService infoService;

    @Autowired
    private AlarmService alarmService;

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

    // 지역 게시판 - 클로저모임 최신순
    @ApiOperation(value = "지역게시판 - 클로저모임 최신글(완료)", response = List.class)
    @PostMapping("lboard/getter")
    public ResponseEntity<List<BoardDto>> lBoardList2(@RequestParam String location) {
        logger.debug("클로저모임 - 최신");
        return new ResponseEntity<>(boardService.lBoardList2(location), HttpStatus.OK);
    }

    // 지역 게시판 - 도와주세요 최신술
    @ApiOperation(value = "지역게시판 - 도와주세요 최신글(완료)", response = List.class)
    @PostMapping("lboard/sos")
    public ResponseEntity<List<BoardDto>> lBoardList3(@RequestParam String location) {
        logger.debug("도와주세요 - 최신");
        return new ResponseEntity<>(boardService.lBoardList3(location), HttpStatus.OK);
    }

    // 뉴스피드
    // 피드 전체 보기
    @ApiOperation(value = "모든 유저들의 피드글 정보를 반환한다.", response = List.class)
    @GetMapping("/feed/total/{page}")
    public ResponseEntity listFeedAll(@PathVariable int page) {
        logger.debug("전체 피드글 - 호출");
        JSONObject output = new JSONObject();
        List<BoardDto> boardDtos = boardService.feedListAll((page-1)*10);
        output.put("data", boardDtos);

        int total = boardService.countFeedAll();
        if(page*10 < total) output.put("hasmore", true);
        else output.put("hasmore", false);

        return new ResponseEntity(output, HttpStatus.OK);
    }

    // 피드 같은 동네만 보기
    @ApiOperation(value = "같은 동네 유저들의 피드글 정보를 반환한다.", response = List.class)
    @GetMapping("/feed/near/{page}")
    public ResponseEntity listFeedNear(@PathVariable int page, @RequestParam String location) {
        logger.debug("동네 피드글 - 호출");
        Map<String, Object> info = new HashMap<String, Object>() {
            {
                put("page", (page-1)*10);
                put("location", location);
            }
        };
        JSONObject output = new JSONObject();
        List<BoardDto> boardDtos = boardService.feedListNear(info);
        output.put("data", boardDtos);

        int total = boardService.countFeedNear(location);
        if(page*10 < total) output.put("hasmore", true);
        else output.put("hasmore", false);

        return new ResponseEntity(output, HttpStatus.OK);
    }

    // 피드 팔로우한 사람들 것만 보기
    // activeUser가 passiveUser를 팔로잉한다.
    @ApiOperation(value = "팔로우 한 유저들의 피드글 정보를 반환한다.", response = List.class)
    @GetMapping("/feed/follow/{page}")
    public ResponseEntity listFeedFollow(@PathVariable int page, @RequestParam String userId) {
        logger.debug("팔로우 피드글 - 호출");
        Map<String, Object> info = new HashMap<String, Object>() {
            {
                put("page", (page-1)*10);
                put("userId", userId);
            }
        };
        JSONObject output = new JSONObject();
        List<BoardDto> boardDtos = boardService.feedListFollow(info);
        output.put("data", boardDtos);

        int total = boardService.countFeedFollow(userId);
        if(page*10 < total) output.put("hasmore", true);
        else output.put("hasmore", false);

        return new ResponseEntity(output, HttpStatus.OK);
    }


    // 게시글 CRUD
    // 게시글 작성
    @ApiOperation(value="게시글 작성")
    @PostMapping()
    public ResponseEntity create(@RequestBody Map<String, Object> info) {
        // 로그인 유저의 정보 받아오기 (주소, 닉네임 찾기 위해서)
        String userId = (String)info.get("userId");
        MemberDto memberDto = userService.userInfo(userId);

        // BoardDto 값 넣기
        BoardDto boardDto = new BoardDto();
        boardDto.setUserId(userId);
        boardDto.setKind_pk((int)info.get("kind_pk"));
        if(info.get("title") != null) boardDto.setTitle((String)info.get("title"));
        boardDto.setContent((String)info.get("content"));
        boardDto.setCreated_at(dateFormat.format(LocalDateTime.now())); // 생성 시간
        boardDto.setUpdated_at(dateFormat.format(LocalDateTime.now())); // 수정 시간
        boardDto.setLocation(memberDto.getAddr()); // 주소
        boardDto.setNickname(memberDto.getNickname()); // 닉네임

        // 이미지 리스트 형식으로 저장
        ArrayList<String> imgUrls = (ArrayList) info.get("imgUrls");

        // InfoDto (사진) 선언
        InfoDto infoDto = new InfoDto();
        if(imgUrls != null) infoDto.setUserId(userId);

        // 리턴할 값 선언 (댓글 수, 좋아요 수, 북마크 수)
        JSONObject output = new JSONObject();

        if(boardDto.getKind_pk() <= 3){ // Gboard인 경우
            int board_pk = boardService.gBoardCreate(boardDto);
            if(board_pk > 0){ // 생성 성공한 경우
                if(imgUrls != null){
                    infoDto.setBoard_pk(board_pk);
                    for(int i=0;i<imgUrls.size();i++) {
                        infoDto.setImgUrl(imgUrls.get(i));
                        if(infoService.addImage(infoDto)) continue;
                        return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
                    }
                }
                output.put("board_pk", board_pk);
                return new ResponseEntity(output, HttpStatus.OK);
            }
        }else if(boardDto.getKind_pk() <= 6){ // Lboard인 경우
            boardDto.setTotalNum((int)info.get("totalNum"));
            int board_pk = boardService.lBoardCreate(boardDto);
            if(board_pk > 0){
                // joinDto 생성 및 본인 인원 추가
                JoinDto joinDto = new JoinDto(board_pk, boardService.findUser(board_pk));
                boardService.addJoin(joinDto);
                boardService.changeJoinCnt(board_pk);

                output.put("board_pk", board_pk);
                return new ResponseEntity(output , HttpStatus.OK);
            }
        }else if(boardDto.getKind_pk() == 7){ // feed인 경우
            int board_pk = boardService.feedCreate(boardDto);
            System.out.println(board_pk);
            if(board_pk > 0){
                if(imgUrls != null) {
                    infoDto.setBoard_pk(board_pk);
                    for (int i = 0; i < imgUrls.size(); i++) {
                        infoDto.setImgUrl(imgUrls.get(i));
                        if (infoService.addImage(infoDto)) continue;
                        return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
                    }
                }
                output.put("board_pk", board_pk);
                return new ResponseEntity(output, HttpStatus.OK);
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
        int kind_pk = Integer.parseInt(info.get("kind_pk"));

        if(userId.equals(user)){
            BoardDto boardDto = new BoardDto();
            boardDto.setBoard_pk(board_pk);
            boardDto.setKind_pk(kind_pk);
            boardDto.setTitle(info.get("title"));
            boardDto.setContent(info.get("content"));
            boardDto.setUpdated_at(dateFormat.format(LocalDateTime.now()));

            if (kind_pk <= 3){ // gboard인 경우
                boardDto.setUpdated_at(dateFormat.format(LocalDateTime.now()));
                if(boardService.gBoardUpdate(boardDto)){ // 수정을 성공했다면
                    return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
                }
            }else if(kind_pk <= 6){ // lboard인 경우
                boardDto.setTotalNum(Integer.parseInt(info.get("totalNum")));
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
    public ResponseEntity<String> delete(@PathVariable int board_pk, @RequestBody Map<String, String> info) {
        // 로그인한 유저와 해당 글을 쓴 유저가 같은지 확인해야함
        // 로그인 유저
        String userId = info.get("userId");
        // 글을 쓴 유저
        String user = boardService.findUser(board_pk);
        if(userId.equals(user)){
            if(boardService.delete(board_pk)) { // 지우는 걸 성공한 경우
                return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
            }
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    // 좋아요, 북마크, 댓글 수 띄우기
    // 로그인하지 않아도 현재 댓글, 좋아요, 북마크 갯수를 파악할 수 있음
    @ApiOperation(value = "댓글, 좋아요, 북마크 수")
    @PostMapping("/{board_pk}/info-cnt")
    public ResponseEntity countInfo(@PathVariable int board_pk){
        try {
            // infoDto 생성
            InfoDto infoDto = new InfoDto();
            infoDto.setBoard_pk(board_pk);

            // 리턴할 값 선언 (댓글 수, 좋아요 수, 북마크 수)
            JSONObject output = new JSONObject();

            // 댓글 수
            infoDto.setKind_pk(1);
            output.put("countComment", infoService.countInfo(infoDto));

            // 좋아요 수
            infoDto.setKind_pk(2);
            output.put("countLike", infoService.countInfo(infoDto));

            // 북마크 수
            infoDto.setKind_pk(3);
            output.put("countBookmark", infoService.countInfo(infoDto));

            return new ResponseEntity(output, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    // 좋아요, 북마크 클릭 및 정보
    // 로그인했을 때 본인이 좋아요, 북마크를 클릭한 상태인지 아닌지를 나타냄
    @ApiOperation(value="좋아요, 북마크 클릭 및 정보")
    @PostMapping("/{board_pk}/info")
    public ResponseEntity infoBoard(@PathVariable int board_pk, @RequestBody Map<String, String> info){
        try {
            // 로그인 유저 정보 갖고 온다
            String userId = info.get("userId");

            // 해당 글을 쓴 유저 정보
            BoardDto boardDto = boardService.read(board_pk);
            String user = boardDto.getUserId();

            // 현재 로드 상태인지 클릭 상태인지 갖고 온다
            String flag = info.get("flag");

            // kind_pk
            int kind_pk = Integer.parseInt(info.get("kind_pk"));

            // 유저 정보가 담긴 infoDto 생성
            InfoDto infoDto = new InfoDto();
            infoDto.setKind_pk(kind_pk); // 2: 좋아요, 3: 북마크
            infoDto.setBoard_pk(board_pk); // 게시글 pk
            infoDto.setUserId(userId); // 로그인한 유저 정보

            // 리턴할 값 선언 (좋아요/북마크 유무, 좋아요/북마크 수)
            JSONObject output = new JSONObject();

            if (flag.equals("false")){ // 로드시
                if(infoService.isClicked(infoDto) > 0) { // 좋아요(북마크)한 경우
                    output.put("clicked", true);
                }else{ // 좋아요(북마크)가 아닌 경우
                    output.put("clicked", false);
                }
            }else if(flag.equals("true")){ // 클릭시
                if(infoService.isClicked(infoDto) > 0){ // 좋아요(북마크)한 경우 => 좋아요(북마크) 취소, cnt 감소
                    infoService.cancelInfo(infoDto);
                    boardService.decreaseCount(board_pk);
                    output.put("clicked", false);
                }else{ // 좋아요(북마크)를 하지 않은 경우 => 좋아요(북마크) 클릭, cnt 증가
                    infoService.addInfo(infoDto);
                    boardService.increaseCount(board_pk);
                    output.put("clicked", true);

                    // 알람
                    // 로그인한 유저가 좋아요(북마크) 하면 -> 상대방 기준으로 alarm이 생성
                    AlarmDto alarmDto = new AlarmDto();
                    alarmDto.setUserId(user); // 상대
                    alarmDto.setCategory_pk(kind_pk); // 2: 좋아요, 3: 북마크
                    alarmDto.setOtherUserId(userId); // 로그인유저가 좋아요(북마크)를 클릭했다
                    alarmDto.setCreated_at(LocalDate.now());

                    // 알림내용
                    // nickname 구하기
                    MemberDto memberDto = userService.userInfo(userId); // 로그인 유저의 정보
                    String nickname = memberDto.getNickname(); // 로그인 유저의 닉네임
                    String content;
                    if(kind_pk == 2){
                        content = nickname + "님이 좋아요를 눌렀습니다.";
                    }else { // kind_pk == 3
                        content = nickname + "님이 북마크를 눌렀습니다.";
                    }
                    alarmDto.setContent(content);

                    alarmDto.setKind_pk(boardDto.getKind_pk()); // 게시글 종류
                    alarmDto.setBoard_pk(board_pk); // 게시글 pk

                    alarmService.alarmBoardCreate(alarmDto);
                }
            }else{
                return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
            }

            // 좋아요 수
            output.put("countInfo", infoService.countInfo(infoDto));

            return new ResponseEntity(output, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    // 댓글 CRD
    // R: 댓글 리스트 조회
    @ApiOperation(value = "댓글 리스트")
    @GetMapping("/{board_pk}/comment")
    public ResponseEntity commentList(@PathVariable int board_pk){
        try{
            // 유저 정보가 담긴 infoDto 생성
            InfoDto infoDto = new InfoDto();
            infoDto.setKind_pk(1);
            infoDto.setBoard_pk(board_pk); // 게시글 pk

            return new ResponseEntity(infoService.commentList(infoDto), HttpStatus.OK);
        }catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    // C: 댓글 생성
    @ApiOperation(value = "댓글 생성")
    @PostMapping("/{board_pk}/comment")
    public ResponseEntity commentCreate(@PathVariable int board_pk, @RequestBody InfoDto infoDto) {
        // 유저 정보가 담긴 infoDto에 kind_pk, board_pk 세팅
        infoDto.setKind_pk(1);
        infoDto.setBoard_pk(board_pk);
        infoDto.setCreated_at(LocalDateTime.now());

        if(infoService.createComment(infoDto)){ // 댓글 생성 성공
            // 알림창
            MemberDto memberDto = userService.userInfo(infoDto.getUserId()); // 로그인 유저의 정보
            BoardDto boardDto = boardService.read(board_pk); // 해당 게시글 정보

            // 로그인한 유저가 좋아요(북마크) 하면 -> 상대방 기준으로 alarm이 생성
            AlarmDto alarmDto = new AlarmDto();
            alarmDto.setUserId(boardDto.getUserId()); // 상대
            alarmDto.setCategory_pk(1); // 1: 댓글
            alarmDto.setOtherUserId(infoDto.getUserId()); // 로그인유저가 댓글을 클릭했다
            alarmDto.setCreated_at(LocalDate.now());

            // 알림내용
            // nickname 구하기
            String nickname = memberDto.getNickname(); // 로그인 유저의 닉네임
            String content = nickname + "님이 댓글을 남겼습니다.";
            alarmDto.setContent(content);

            alarmDto.setKind_pk(boardDto.getKind_pk()); // 게시글 종류
            alarmDto.setBoard_pk(board_pk); // 게시글 pk

            alarmService.alarmBoardCreate(alarmDto);

            return new ResponseEntity(SUCCESS, HttpStatus.OK);
        }
        // 댓글 생성 실패
        return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);

    }

    // D: 댓글 삭제
    @ApiOperation(value = "특정 댓글 삭제")
    @DeleteMapping("/{board_pk}/comment/{info_pk}")
    public ResponseEntity<String> commentDelete(@PathVariable int board_pk, @PathVariable int info_pk, @RequestBody Map<String, String> info) {
        // 로그인한 유저와 해당 댓글을 쓴 유저가 같은지 확인해야함
        // 로그인한 유저
        String userId = info.get("userId");
        // 해당 댓글 쓴 유저 정보 데려오기
        String user = infoService.findCommentUser(info_pk);

        if(userId.equals(user)){
            // 댓글 삭제 성공
            if(infoService.deleteComment(info_pk)){
                return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
            }
        }
        // 댓글 삭제 실패
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }

    // 지역게시판 모임 참가
    @ApiOperation(value = "지역게시판 모임 참가")
    @PostMapping("/{board_pk}/join")
    public ResponseEntity<String> commentDelete(@PathVariable int board_pk, @RequestBody Map<String, String> info) {
        try {
            String user = boardService.findUser(board_pk); // 해당 글 쓴 유저 정보 데려오기
            String userId = info.get("userId"); // 로그인 유저 정보 갖고 온다

            // 현재 로드 상태인지 클릭 상태인지 갖고 온다
            String flag = info.get("flag");

            // joinDto 생성
            JoinDto joinDto = new JoinDto(board_pk, userId);

            // 리턴할 값 선언 (참가 유무, 참가 수)
            JSONObject output = new JSONObject();

            // 로그인한 유저와 해당 댓글을 쓴 유저가 같은지 확인해야함
            // 본인이 누르면 안됨 (반드시 참가해야 하기 때문)
            if(userId.equals(user)){
                output.put("joined", true);
            }
            else if (flag.equals("false")){ // 로드시
                if(boardService.isJoin(joinDto)) { // 참가한 경우
                    output.put("joined", true);
                }else{ // 참가하지 않은 경우
                    output.put("joined", false);
                }
            }else if(flag.equals("true")){ // 클릭시
                if(boardService.isJoin(joinDto)){ // 참가한 경우 => 참가 취소, 참가자 인원 수 감소
                    boardService.cancelJoin(joinDto);
                    boardService.changeJoinCnt(board_pk);
                    output.put("joined", false);
                }else{ // 참가를 하지 않은 경우 => 참가 클릭, 참가자 인원 수 증가
                    boardService.addJoin(joinDto);
                    boardService.changeJoinCnt(board_pk);
                    output.put("joined", true);
                }
            }else{
                return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
            }

            // 참가자 수
            output.put("countJoin", boardService.countJoin(board_pk));

            return new ResponseEntity(output, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    // 게시글 사진 관련 (호영님이 aws 연결한 후에 하기로 함)
}
