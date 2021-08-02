package com.ssafy.closer.model.mapper;

import com.ssafy.closer.model.dto.AlarmDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AlarmMapper {
    List<AlarmDto> alarmList(String userId); // 알람들
    int alarmCreate(AlarmDto alarmDto); // 알람 생성
    int alarmUnread(String userId); // 읽지 않은 알람 갯수
    int readAll(String userId); // 알림 모두 읽은걸로 바꾸기
}
