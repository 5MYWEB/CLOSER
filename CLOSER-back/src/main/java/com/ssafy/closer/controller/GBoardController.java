package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.BookmarkDto;
import com.ssafy.closer.model.dto.CommentDto;
import com.ssafy.closer.model.dto.LikeDto;
import com.ssafy.closer.model.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/gboard")
@Api("Gboard Controller API V1")
@CrossOrigin("*")
public class GBoardController {
    private static final Logger logger = LoggerFactory.getLogger(GBoardController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    //@Autowired
//    private GBoardService gBoardService;

    @Autowired
    private LikeService likeService;

    @Autowired
    private BookmarkService bookmarkService;

    @Autowired
    private UserService userService;

    @Autowired
    private CommentService commentService;

    // 5. Gboard 좋아요 (좋아요 or 좋아요 취소 , 좋아요 갯수)
    @ApiOperation(value="좋아요 정보")
    @PostMapping("/{id}/like")
    public ResponseEntity likeGboard(@PathVariable int id, HttpServletRequest request){
        logger.debug(id +"/like" + ": 좋아요 or 좋아요 취소 요청");
        logger.debug(request.getParameter("flag"));

        try {
            // 로그인 유저 정보 갖고 온다 => activeUser
            String userId = request.getParameter("login_user");

            // 유저 정보가 담긴 likeDto 생성
            LikeDto likeDto = new LikeDto();
            likeDto.setKind_pk(1);
            likeDto.setBoard_pk(id);
            likeDto.setUserId(userId);

            // 리턴할 값 선언 (좋아요 유무, 좋아요 수)
            JSONObject likeOutput = new JSONObject();

            if (request.getParameter("flag").equals("false")){ // 로드시
                if(likeService.isLike(likeDto) > 0) { // 좋아요한 경우
                    likeOutput.put("liked", true);
                }else{ // 좋아요가 아닌 경우
                    likeOutput.put("liked", false);
                }
            }else{ // 클릭시
                if(likeService.isLike(likeDto) > 0){ // 좋아요인 경우 => 좋아요 취소
                    likeService.cancelLike(likeDto);
                    likeOutput.put("liked", false);
                }else{ // 좋아요를 하지 않은 경우 => 좋아요 클릭
                    likeService.addLike(likeDto);
                    likeOutput.put("liked", true);
                }
            }

            // 좋아요 수
            likeOutput.put("countLike", likeService.countLike(likeDto));

            return new ResponseEntity(likeOutput, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    // 6. Gboard 스크랩 (스크랩 or 스크랩 취소, 스크랩 수)
    @ApiOperation(value="스크랩 정보")
    @PostMapping("/{id}/bookmark")
    public ResponseEntity bookmarkGboard(@PathVariable int id, HttpServletRequest request){
        logger.debug(id +"/bookmark" + ": 좋아요 or 좋아요 취소 요청");
        logger.debug(request.getParameter("flag"));

        try {
            // 로그인 유저 정보 갖고 온다 => userId
            String userId = request.getParameter("login_user");

            // 유저 정보가 담긴 likeDto 생성
            BookmarkDto bookmarkDto = new BookmarkDto();
            bookmarkDto.setKind_pk(1);
            bookmarkDto.setBoard_pk(id);
            bookmarkDto.setUserId(userId);

            // 리턴할 값 선언 (좋아요 유무, 좋아요 수)
            JSONObject bookmarkOutput = new JSONObject();

            if (request.getParameter("flag").equals("false")){ // 로드시
                if(bookmarkService.isBookmark(bookmarkDto) > 0) { // 좋아요한 경우
                    bookmarkOutput.put("liked", true);
                }else{ // 좋아요가 아닌 경우
                    bookmarkOutput.put("liked", false);
                }
            }else{ // 클릭시
                if(bookmarkService.isBookmark(bookmarkDto) > 0){ // 좋아요인 경우 => 좋아요 취소
                    bookmarkService.cancelBookmark(bookmarkDto);
                    bookmarkOutput.put("liked", false);
                }else{ // 좋아요를 하지 않은 경우 => 좋아요 클릭
                    bookmarkService.addBookmark(bookmarkDto);
                    bookmarkOutput.put("liked", true);
                }
            }

            // 좋아요 수
            bookmarkOutput.put("countLike", bookmarkService.countBookmark(bookmarkDto));

            return new ResponseEntity(bookmarkOutput, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    // 7. Gboard 댓글 수 띄우기
    @ApiOperation(value="Gboard 댓글 수")
    @PostMapping("/{id}/comment_cnt")
    public ResponseEntity commentCntGboard(@PathVariable int id, HttpServletRequest request){
        logger.debug(id +"/comment_cnt" + ": Gboard 댓글 수");

        try {
            // 유저 정보가 담긴 likeDto 생성
            CommentDto commentDto = new CommentDto();
            commentDto.setKind_pk(1);
            commentDto.setBoard_pk(id);

            // 리턴할 값 선언 (좋아요 유무, 좋아요 수)
            JSONObject commentOutput = new JSONObject();

            // 댓글 수
            commentOutput.put("countComment", commentService.countComment(commentDto));

            return new ResponseEntity(commentOutput, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
        }
    }
}
