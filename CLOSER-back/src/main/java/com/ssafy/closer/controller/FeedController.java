package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.*;
import com.ssafy.closer.model.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.sf.json.JSONObject;
import org.apache.catalina.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Map;


@RestController
@RequestMapping("/feed")
@Api("Feed Controller API V1")
@CrossOrigin("*")
public class FeedController {
    private static final Logger logger = LoggerFactory.getLogger(FeedController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private FeedService feedService;

    // 1. 피드 작성

    // 2 - 1. 피드 전체 보기
//    @ApiOperation(value = "모든 유저들의 피드글 정보를 반환한다.", response = List.class)
//    @GetMapping("/total")
//    public ResponseEntity<List<FeedDto>> listFeedAll() throws Exception{
//        logger.debug("전체 피드글 - 호출");
//        return new ResponseEntity<>(feedService.feedListAll(), HttpStatus.OK);
//    }
//
//    // 2 - 2. 피드 같은 동네만 보기
//    @ApiOperation(value = "같은 동네 유저들의 피드글 정보를 반환한다.", response = List.class)
//    @GetMapping("/near")
//    public ResponseEntity<List<FeedDto>> listFeedNear(@RequestParam String location) {
//        logger.debug("동네 피드글 - 호출");
//        return new ResponseEntity<List<FeedDto>>(feedService.feedListNear(location), HttpStatus.OK);
//    }
//
//    // 2 - 3. 피드 팔로우한 사람들 것만 보기
//    // activeUser가 passiveUser를 팔로잉한다.
//    @ApiOperation(value = "팔로우 한 유저들의 피드글 정보를 반환한다.", response = List.class)
//    @GetMapping("/follow")
//    public ResponseEntity<List<FeedDto>> listFeedFollow(String userId) {
//        logger.debug("팔로우 피드글 - 호출");
//        return new ResponseEntity<List<FeedDto>>(feedService.feedListFollow(userId), HttpStatus.OK);
//    }
//
//    // 3. 피드 사진 띄우기 <- PictureController
//
//    @Autowired
//    private LikeService likeService;
//
//    @Autowired
//    private BookmarkService bookmarkService;
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private CommentService commentService;
//
//    // 1. 피드 작성
//    @ApiOperation(value="피드 작성")
//    @PostMapping()
//    public ResponseEntity create(@RequestBody FeedDto feedDto) {
//        // 로그인 유저의 정보 받아오기 (주소찾기 위해서)
//        MemberDto memberDto = userService.userInfo(feedDto.getUserId());
//
//        // FeedDto 값 넣기
//        feedDto.setLocation(memberDto.getAddr());
//        feedDto.setCreated_at(LocalDateTime.now());
//
//        if(feedService.createFeed(feedDto)){
//            return new ResponseEntity(SUCCESS, HttpStatus.OK);
//        }
//        return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
//    }
//
//    // 2. 피드 상세 보기
//    @ApiOperation(value = "피드 상세 보기")
//    @GetMapping("/{feed_pk}")
//    public ResponseEntity<FeedDto> detail(@PathVariable int feed_pk) throws Exception {
//        return new ResponseEntity<FeedDto>(feedService.readFeed(feed_pk), HttpStatus.OK);
//    }
//
//    // 3. 피드 사진 띄우기 (호영님이 aws 연결한 후에 하기로 함)
//
//
//    // 4. 피드 삭제
//    @ApiOperation(value = "해당 글 삭제")
//    @DeleteMapping("/{feed_pk}")
//    public ResponseEntity<String> delete(@PathVariable int feed_pk, @RequestBody String userId) {
//        // 로그인한 유저와 해당 글을 쓴 유저가 같은지 확인해야함
//        String user = feedService.findFeedUser(feed_pk);
//        if(userId.equals(user)){
//            if(feedService.deleteFeed(3, feed_pk)){
//                return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
//            }
//        }
//        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
//    }
//
//
//    // 5. 피드 좋아요 (좋아요 or 좋아요 취소 , 좋아요 갯수)
//    @ApiOperation(value="좋아요 정보")
//    @PostMapping("/{feed_pk}/like")
//    public ResponseEntity likeFeed(@PathVariable int feed_pk, @RequestBody Map<String, String> info){
//        logger.debug(feed_pk +"/like" + ": 좋아요 or 좋아요 취소 요청");
//
//        try {
//            // 로그인 유저 정보 갖고 온다
//            String userId = info.get("userId");
//            // 현재 로드 상태인지 클릭 상태인지 갖고 온다
//            String flag = info.get("flag");
//
//            // 유저 정보가 담긴 likeDto 생성
//            LikeDto likeDto = new LikeDto();
//            likeDto.setKind_pk(3);
//            likeDto.setBoard_pk(feed_pk);
//            likeDto.setUserId(userId);
//
//            // 리턴할 값 선언 (좋아요 유무, 좋아요 수)
//            JSONObject likeOutput = new JSONObject();
//
//            if (flag.equals("false")){ // 로드시
//                if(likeService.isLike(likeDto) > 0) { // 좋아요한 경우
//                    likeOutput.put("liked", true);
//                }else{ // 좋아요가 아닌 경우
//                    likeOutput.put("liked", false);
//                }
//            }else{ // 클릭시
//                if(likeService.isLike(likeDto) > 0){ // 좋아요인 경우 => 좋아요 취소
//                    likeService.cancelLike(likeDto);
//                    likeOutput.put("liked", false);
//                }else{ // 좋아요를 하지 않은 경우 => 좋아요 클릭
//                    likeService.addLike(likeDto);
//                    likeOutput.put("liked", true);
//                }
//            }
//
//            // 좋아요 수
//            likeOutput.put("countLike", likeService.countLike(likeDto));
//
//            return new ResponseEntity(likeOutput, HttpStatus.OK);
//        }catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
//        }
//    }
//
//    // 6. 피드 스크랩 수 띄우기 (스크랩 or 스크랩 취소, 스크랩 수)
//    @ApiOperation(value="스크랩 정보")
//    @PostMapping("/{feed_pk}/bookmark")
//    public ResponseEntity bookmarkFeed(@PathVariable int feed_pk, @RequestBody Map<String, String> info){
//        logger.debug(feed_pk +"/bookmark" + ": 북마크 or 북마크 취소 요청");
//
//        try {
//            /// 로그인 유저 정보 갖고 온다
//            String userId = info.get("userId");
//            // 현재 로드 상태인지 클릭 상태인지 갖고 온다
//            String flag = info.get("flag");
//
//            // 유저 정보가 담긴 likeDto 생성
//            BookmarkDto bookmarkDto = new BookmarkDto();
//            bookmarkDto.setKind_pk(3);
//            bookmarkDto.setBoard_pk(feed_pk);
//            bookmarkDto.setUserId(userId);
//
//            // 리턴할 값 선언 (북마크 유무, 북마크 수)
//            JSONObject bookmarkOutput = new JSONObject();
//
//            if (flag.equals("false")){ // 로드시
//                if(bookmarkService.isBookmark(bookmarkDto) > 0) { // 북마크인 경우
//                    bookmarkOutput.put("bookmarked", true);
//                }else{ // 북마크 아닌 경우
//                    bookmarkOutput.put("bookmarked", false);
//                }
//            }else{ // 클릭시
//                if(bookmarkService.isBookmark(bookmarkDto) > 0){ // 북마크인 경우 => 북마크 취소
//                    bookmarkService.cancelBookmark(bookmarkDto);
//                    bookmarkOutput.put("bookmarked", false);
//                }else{ // 북마크를 하지 않은 경우 => 북마크 클릭
//                    bookmarkService.addBookmark(bookmarkDto);
//                    bookmarkOutput.put("bookmarked", true);
//                }
//            }
//
//            // 좋아요 수
//            bookmarkOutput.put("countBookmark", bookmarkService.countBookmark(bookmarkDto));
//
//            return new ResponseEntity(bookmarkOutput, HttpStatus.OK);
//        }catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
//        }
//    }
//
//    // 7. 피드 댓글 수 띄우기
//    @ApiOperation(value="피드 댓글 수")
//    @PostMapping("/{feed_pk}/comment-cnt")
//    public ResponseEntity commentCntFeed(@PathVariable int feed_pk){
//        logger.debug(feed_pk +"/comment_cnt" + ": 피드 댓글 수");
//
//        try {
//            // 유저 정보가 담긴 commentDto 생성
//            CommentDto commentDto = new CommentDto();
//            commentDto.setKind_pk(3);
//            commentDto.setBoard_pk(feed_pk);
//
//            // 리턴할 값 선언 (좋아요 유무, 좋아요 수)
//            JSONObject commentOutput = new JSONObject();
//
//            // 댓글 수
//            commentOutput.put("countComment", commentService.countComment(commentDto));
//
//            return new ResponseEntity(commentOutput, HttpStatus.OK);
//        }catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
//        }
//    }
//
//    // 7. 피드 댓글 list 띄우기
//    @ApiOperation(value = "댓글 리스트")
//    @GetMapping("/{feed_pk}/comment")
//    public ResponseEntity commentList(@PathVariable int feed_pk){
//        try{
//            // 유저 정보가 담긴 commentDto 생성
//            CommentDto commentDto = new CommentDto();
//            commentDto.setKind_pk(3);
//            commentDto.setBoard_pk(feed_pk);
//
//            return new ResponseEntity(commentService.commentList(commentDto), HttpStatus.OK);
//        }catch(Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
//        }
//    }
//
//    // 8. 피드 댓글 달기
//    @ApiOperation(value = "댓글 생성")
//    @PostMapping("/{feed_pk}/comment")
//    public ResponseEntity commentCreate(@PathVariable int feed_pk, @RequestBody CommentDto commentDto) {
//        // 유저 정보가 담긴 commentDto에 kind_pk, board_pk 세팅
//        commentDto.setKind_pk(3);
//        commentDto.setBoard_pk(feed_pk);
//
//        if(commentService.createComment(commentDto)){ // 댓글 생성 성공
//            return new ResponseEntity(SUCCESS, HttpStatus.OK);
//        }
//        // 댓글 생성 실패
//        return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
//
//    }
//
//
//    // 9. 피드 댓글 삭제
//    @ApiOperation(value = "특정 댓글 삭제")
//    @DeleteMapping("/{feed_pk}/comment/{comment_pk}")
//    public ResponseEntity<String> commentDelete(@PathVariable int feed_pk, @PathVariable int comment_pk, @RequestBody String userId) {
//        // 로그인한 유저와 해당 댓글을 쓴 유저가 같은지 확인해야함
//        // 해당 댓글 쓴 유저 정보 데려오기
//        String user = commentService.findCommentUser(comment_pk);
//
//        if(userId.equals(user)){
//            // 댓글 삭제 성공
//            if(commentService.deleteComment(comment_pk)){
//                return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
//            }
//        }
//        // 댓글 삭제 실패
//        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
//    }

}
