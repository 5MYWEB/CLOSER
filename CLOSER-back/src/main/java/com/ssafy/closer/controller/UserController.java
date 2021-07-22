package com.ssafy.closer.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import com.ssafy.closer.model.dto.MemberDto;
import com.ssafy.closer.model.service.JwtService;
import com.ssafy.closer.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/user")
@Api("User Controller API V1")
@CrossOrigin("*")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @ApiOperation(value = "로그인 화면으로 이동")
    @GetMapping("/login")
    public ModelAndView login() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("user/login");
        return mav;
    }

    @ApiOperation(value = "로그인.", response = MemberDto.class)
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginInfo,
                                                     HttpServletResponse response) {
        logger.debug("login 정보 - " + loginInfo);
        try {
            Map<String, String> user = userService.login(loginInfo);

            // 로그인에 성공했다면 토큰을 만듭시당.
            if (user != null) {
                logger.debug(user.toString());
                String token = jwtService.create(user);
                user.put("token", token);

                // 토큰 정보는 response의 헤더로 보내자
                response.setHeader("jwt-auth-token", token);
                return new ResponseEntity<Map<String, String>>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity(HttpStatus.NO_CONTENT);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
    }

    @ApiOperation(value = "회원가입", response = String.class)
    @PostMapping("/regist")
    public ResponseEntity<String> register(@RequestBody MemberDto memberDto) {
        try {
            logger.debug("회원가입 : " + memberDto);
            int n = userService.userRegister(memberDto);

            if (n > 0) {
                return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
            } else {
                return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    @ApiOperation(value = "아이디 중복 확인", notes = "사용자의 아이디 중복 확인")
    @PostMapping("/userIdCheck")
    public ResponseEntity<String> userIdCheck(@RequestParam String userId) {
        logger.debug("중복 확인 요청된 아이디 : " + userId);

        int result = userService.userIdCheck(userId);

        if(result == 0){
            return ResponseEntity.ok("사용 가능한 아이디입니다.");
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용중인 아이디입니다.");
    }

    @ApiOperation(value = "닉네임 중복확인", notes = "사용자의 닉네임 중복확인")
    @PostMapping("/userNicknameCheck")
    public ResponseEntity<String> userNicknameCheck(@RequestParam String nickname) {
        logger.debug("중복 확인 요청된 닉네임 : " + nickname);

        int result = userService.userNicknameCheck(nickname);

        if(result == 0){
            return ResponseEntity.ok("사용 가능한 닉네임입니다.");
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용중인 닉네임입니다.");
    }


    @ApiOperation(value = "로그아웃")
    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        logger.debug("로그아웃");
        return new ResponseEntity<String>("ok", HttpStatus.OK);
    }


    @ApiOperation(value = "프로필 수정", notes = "사용자의 <big> 프로필 사진, 닉네임, 위치, 한줄소개</big>를 수정합니다.", response = MemberDto.class)
    @PutMapping(value = "/mypage")
    public ResponseEntity<String> modify(@RequestBody MemberDto updateInfo) {
        logger.debug("수정정보 : " + updateInfo);

        MemberDto memberDto = new MemberDto();
        memberDto.setProfileImg(updateInfo.getProfileImg());
        memberDto.setNickname(updateInfo.getNickname());
        memberDto.setAddr(updateInfo.getAddr());
        memberDto.setIntro(updateInfo.getIntro());

        try {
            int n = userService.userModify(memberDto);
            if (n > 0) {
                return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
            } else {
                return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    @ApiOperation(value = "회원 탈퇴", response = MemberDto.class)
    @DeleteMapping("/")
    public ResponseEntity<String> delete(@RequestParam String userid) {
        logger.debug("회원 탈퇴 : 아이디 " + userid);
        try {
            int n = userService.userDelete(userid);
            if (n > 0) {
                return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
            } else {
                return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
    }

//    @ApiOperation(value = "팔로우")
//    @PostMapping("/follow")
//    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> followInfo,
//                                                     HttpServletResponse response) {
////        logger.debug(followInfo);
//
////    }
}