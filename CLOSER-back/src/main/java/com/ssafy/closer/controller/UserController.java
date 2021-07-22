package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.MemberDto;
import com.ssafy.closer.model.service.JwtService;
import com.ssafy.closer.model.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
import java.util.Map;

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
    public ResponseEntity login(@RequestBody Map<String, String> loginInfo,
                                                     HttpServletResponse response) {
        logger.debug("login 정보 - " + loginInfo);
        try {
            Map<String, String> user = userService.login(loginInfo);

            // 로그인에 성공했다면 토큰을 만듭시당.
            if (user != null) {
                logger.debug(user.toString());
                String token = jwtService.create(user.get("userId")); // 토큰에 유저 아이디만 넣는다.
                user.put("token", token);

                // 토큰 정보는 response의 헤더로 보내자
                response.setHeader("jwt-auth-token", token);
                return new ResponseEntity(SUCCESS, HttpStatus.OK);
            } else {
                logger.debug("login fail");
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

    @ApiOperation(value = "로그아웃")
    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        logger.debug("로그아웃");
        return new ResponseEntity<String>("ok", HttpStatus.OK);
    }


    @ApiOperation(value = "개인정보 수정", response = MemberDto.class)
    @PutMapping(value = "/mypage")
    public ResponseEntity<String> modify(@RequestBody MemberDto updateInfo) {
        logger.debug("수정정보 : " + updateInfo);

        try {
            int n = userService.userModify(updateInfo);
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

}