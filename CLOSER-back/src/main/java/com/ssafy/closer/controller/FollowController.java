package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.FollowDto;
import com.ssafy.closer.model.dto.FollowOutputDto;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/follow")
@Api("User Controller API V1")
@CrossOrigin("*")
public class FollowController {

    private static final Logger logger = LoggerFactory.getLogger(FollowController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private FollowService followService;

    @Autowired
    private UserService userService;

    // post 확인해봐야함
    @ApiOperation(value = "팔로우 or 언팔로우", response = FollowOutputDto.class)
//    @RequestMapping("/{id}/follow")
    @PostMapping("/{id}/follow")
    public ResponseEntity follow(@PathVariable String id, HttpServletRequest request) {
        logger.debug(id +"/follow" + ": 팔로우 or 언팔로우 요청");
        logger.debug(request.getParameter("flag"));

        try {
            // 로그인 유저 정보 갖고 온다 => activeUser
            String activeUser = request.getParameter("login_user");

            // 로그인 유저가 팔로우 누른 유저 (passiveUser)
            String passiveUser = id;

            // activeUser, passiveUser 정보가 담긴 followDto 생성
            FollowDto followDto = new FollowDto(activeUser, passiveUser);

            // 리턴할 값 선언 (팔로우 유무, 팔로워 수, 팔로잉 수)
            FollowOutputDto followOutputDto = new FollowOutputDto();

            if(request.getParameter("flag").equals("false")){ // 로드시
                if (followService.isFollow(followDto) > 0){ // 팔로우인 경우
                    followOutputDto.setFollowed(true);
                }else{ // 언팔로우인 경우
                    followOutputDto.setFollowed(false);
                }
            }else{ // 클릭시
                // 본인과 유저가 다른 경우에만 팔로우, 언팔로우를 할 수 있음
                if(!activeUser.equals(passiveUser)) {
                    if (followService.isFollow(followDto) > 0){ // 팔로우인 경우 => 언팔로우
                        followService.unfollow(followDto);
                        followOutputDto.setFollowed(false);
                    }else{ // 언팔로우인 경우 => 팔로우
                        followService.follow(followDto);
                        followOutputDto.setFollowed(true);
                    }
                }
            }

            followOutputDto.setFollowing(followService.countActiveUser(followDto)); // 팔로잉 수
            followOutputDto.setFollower(followService.countPassiveUser(followDto)); // 팔로워 수

            return new ResponseEntity(followOutputDto, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
        }

    }

    @ApiOperation(value = "팔로잉 리스트", response = FollowDto.class)
    @PostMapping("/{id}/following")
    public ResponseEntity followingList(@PathVariable String id){
        logger.debug(id +"/following" + ": 팔로잉 리스트");

        try {
            // 로그인 유저가 팔로우 누른 유저 (passiveUser)
            String passiveUser = id;
            return new ResponseEntity(followService.activeUserList(passiveUser), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    @ApiOperation(value = "팔로워 리스트", response = FollowDto.class)
    @PostMapping("/{id}/follower")
    public ResponseEntity followerList(@PathVariable String id){
        logger.debug(id +"/follower" + ": 팔로워 리스트");
        try {
            // 로그인 유저가 팔로우 누른 유저 (passiveUser)
            String passiveUser = id;
            return new ResponseEntity(followService.passiveUserList(passiveUser), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
        }
    }

}
