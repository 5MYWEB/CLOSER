package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.FeedDto;
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
    @ApiOperation(value = "모든 유저들의 피드글 정보를 반환한다.", response = List.class)
    @GetMapping("/total")
    public ResponseEntity<List<FeedDto>> listFeedAll() throws Exception{
        logger.debug("전체 피드글 - 호출");
        return new ResponseEntity<>(feedService.feedListAll(), HttpStatus.OK);
    }

    // 2 - 2. 피드 같은 동네만 보기
    @ApiOperation(value = "같은 동네 유저들의 피드글 정보를 반환한다.", response = List.class)
    @GetMapping("/near")
    public ResponseEntity<List<FeedDto>> listFeedNear(@RequestParam String location) {
        logger.debug("동네 피드글 - 호출");
        return new ResponseEntity<List<FeedDto>>(feedService.feedListNear(location), HttpStatus.OK);
    }

    // 2 - 3. 피드 팔로우한 사람들 것만 보기
    // activeUser가 passiveUser를 팔로잉한다.
    @ApiOperation(value = "팔로우 한 유저들의 피드글 정보를 반환한다.", response = List.class)
    @GetMapping("/follow")
    public ResponseEntity<List<FeedDto>> listFeedFollow(String userId) {
        logger.debug("팔로우 피드글 - 호출");
        return new ResponseEntity<List<FeedDto>>(feedService.feedListFollow(userId), HttpStatus.OK);
    }

    // 3. 피드 사진 띄우기 <- PictureController


    // 4. 피드 좋아요 수 띄우기 <- LikeController


    // 5. 피드 댓글 list 띄우기 <- ReplyController


    // 6. 피드 스크랩 수 띄우기 <- BookmarkController


    // 7. 피드 삭제

}
