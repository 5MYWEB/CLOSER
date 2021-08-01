package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.FollowDto;
import com.ssafy.closer.model.service.FollowService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    // post 확인해봐야함
    // 팔로우 or 언팔로우 , 팔로잉 갯수, 팔로워 갯수
    @ApiOperation(value = "팔로우 or 언팔로우")
    @PostMapping("/{id}/follow")
    public ResponseEntity follow(@PathVariable String id, @RequestBody Map<String, String> info) {
        try {
            // 로그인 유저 정보 갖고 온다 => activeUser
            String activeUser = info.get("userId");

            // 로그인 유저가 팔로우 누른 유저 (passiveUser)
            String passiveUser = id;

            // 현재 로드 상태인지 클릭 상태인지 갖고 온다
            String flag = info.get("flag");

            // activeUser, passiveUser 정보가 담긴 followDto 생성
            FollowDto followDto = new FollowDto(activeUser, passiveUser);

            // 리턴할 값 선언 (팔로우 유무, 팔로워 수, 팔로잉 수)
            JSONObject output = new JSONObject();

            if(flag.equals("false")){ // 로드시
                if (followService.isFollow(followDto) > 0){ // 팔로우인 경우
                    output.put("followed", true);
                }else{ // 언팔로우인 경우
                    output.put("followed", false);
                }
            }else{ // 클릭시
                // 본인과 유저가 다른 경우에만 팔로우, 언팔로우를 할 수 있음
                if(!activeUser.equals(passiveUser)) {
                    if (followService.isFollow(followDto) > 0){ // 팔로우인 경우 => 언팔로우
                        followService.unfollow(followDto);
                        output.put("followed", false);
                    }else{ // 언팔로우인 경우 => 팔로우
                        followService.follow(followDto);
                        output.put("followed", true);
                    }
                }
            }

            // 팔로잉, 팔로워 수
            output.put("following", followService.countActiveUser(followDto)); // 팔로잉 수
            output.put("follower", followService.countPassiveUser(followDto)); // 팔로워 수

            return new ResponseEntity(output, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
        }

    }

    @ApiOperation(value = "팔로잉 리스트")
    @PostMapping("/{id}/following")
    public ResponseEntity followingList(@PathVariable String id){
        try {
            // 로그인 유저가 팔로우 누른 유저 (passiveUser)
            String passiveUser = id;
            return new ResponseEntity(followService.activeUserList(passiveUser), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    @ApiOperation(value = "팔로워 리스트")
    @PostMapping("/{id}/follower")
    public ResponseEntity followerList(@PathVariable String id){
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
