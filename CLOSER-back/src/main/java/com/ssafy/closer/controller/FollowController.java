package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.FollowDto;
import com.ssafy.closer.model.dto.MemberDto;
import com.ssafy.closer.model.service.FollowService;
import com.ssafy.closer.model.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin("*")
public class FollowController {

    private static final Logger logger = LoggerFactory.getLogger(FollowController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private FollowService followService;

    @Autowired
    private UserService userService;

    @ApiOperation(value = "팔로우", response = String.class)
    @PostMapping("/follow/{id}")
    public ResponseEntity<String> follow(@PathVariable String id, HttpSession session) {
        logger.info("/follow/" + id + ": 팔로우 요청");

        try {
            // 로그인 유저 정보 갖고 온다 => activeUser
            Object object = session.getAttribute("login");
            MemberDto activeUser = (MemberDto) object;
            // 로그인 유저가 팔로우 누른 유저 (passiveUser)
            MemberDto passiveUser = userService.userInfo(id);

            // activeUser, passiveUser 정보가 담긴 followDto 생성
            FollowDto followDto = new FollowDto(activeUser.getUserId(), passiveUser.getUserId());

            // db에 변경사항 저장
            followService.follow(followDto);

            // 변화된 팔로워 수
            int follow_num = followService.isFollow(followDto);

            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }

    }

    @ApiOperation(value = "언팔로우", response = String.class)
    @PostMapping("/unfollow/{id}")
    public ResponseEntity<String> unfollow(@PathVariable String id, HttpSession session) {
        logger.info("/follow/" + id + ": 언팔로우 요청");

        try {
            // 로그인 유저 정보 갖고 온다 => activeUser
            Object object = session.getAttribute("login");
            MemberDto activeUser = (MemberDto) object;
            // 로그인 유저가 팔로우 누른 유저 (passiveUser)
            MemberDto passiveUser = userService.userInfo(id);

            // db에 변경사항 저장
            followService.unfollow(new FollowDto(activeUser.getUserId(), passiveUser.getUserId()));

            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }

    }


}
