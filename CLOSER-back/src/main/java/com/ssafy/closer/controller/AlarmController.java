package com.ssafy.closer.controller;

import com.ssafy.closer.model.dto.AlarmDto;
import com.ssafy.closer.model.dto.BoardDto;
import com.ssafy.closer.model.dto.BotDto;
import com.ssafy.closer.model.dto.MemberDto;
import com.ssafy.closer.model.service.AlarmService;
import com.ssafy.closer.model.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/alarm")
@Api("Alarm Controller API V1")
@CrossOrigin("*")
public class AlarmController {
    private static final Logger logger = LoggerFactory.getLogger(AlarmController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private AlarmService alarmService;

    @Autowired
    private UserService userService;

    // 봇 알람 생성
    @ApiOperation(value="봇 알림 생성")
    @PostMapping("/user_bot/{id}/create")
    public ResponseEntity<String> createBotAlarm(@RequestBody BotDto botDto){
        try {
            logger.debug(botDto.getContent());
            logger.debug(botDto.getDate());
            logger.debug(botDto.getDay());
            logger.debug("봇 알림 생성 : " + botDto);
            int n = alarmService.alarmBotCreate(botDto);
            if(n > 0){
                return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
            } else {
                return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    // 알람 리스트
    @ApiOperation(value = "알람 리스트")
    @PostMapping("")
    public ResponseEntity alarmList(@RequestBody Map<String, String> info) {
        try{
            String userId = info.get("userId");
            List<AlarmDto> alarms = alarmService.alarmList(userId);
            return new ResponseEntity(alarms, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    // 안읽은 알람 갯수
    @ApiOperation(value = "안읽은 알람 갯수")
    @PostMapping("/unreadCount")
    public ResponseEntity unreadCount(@RequestBody Map<String, String> info) {
        try{
            String userId = info.get("userId");
            System.out.println(alarmService.alarmUnread(userId));
            int cnt = alarmService.alarmUnread(userId);

            // 리턴할 값 선언 (안읽은 알람 갯수)
            JSONObject output = new JSONObject();
            output.put("countAlarm", cnt);

            return new ResponseEntity(output, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    // 알람 모두 읽음 표시
    @ApiOperation(value = "모두 읽음 표시")
    @PostMapping("/read-all")
    public ResponseEntity readAll(@RequestBody Map<String, String> info) {
        String userId = info.get("userId");
        if(alarmService.readAll(userId) > 0){ // 모두 읽는거 성공하면
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }
}
