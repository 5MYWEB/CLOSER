package com.ssafy.closer.controller;

import com.ssafy.closer.model.service.FeedService;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


    // 2. 피드 상세 보기


    // 3. 피드 사진 띄우기 <- PictureController


    // 4. 피드 좋아요 수 띄우기 <- LikeController


    // 5. 피드 댓글 list 띄우기 <- ReplyController


    // 6. 피드 스크랩 수 띄우기 <- BookmarkController


    // 7. 피드 삭제

}
