package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.AlarmDto;

import java.util.List;

public interface AlarmService {
    List<AlarmDto> alarmList(String userId); // 알람들
    int alarmCreate(AlarmDto alarmDto); // 알람 생성
    int alarmUnread(String userId); // 읽지 않은 알람 갯수
    boolean readAll(String userId); // 알림 모두 읽은걸로 바꾸기
}
