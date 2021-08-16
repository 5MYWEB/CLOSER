package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.AlarmDto;
import com.ssafy.closer.model.dto.BotDto;
import com.ssafy.closer.model.mapper.AlarmMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlarmServiceImpl implements AlarmService {
    private static final Logger logger = LoggerFactory.getLogger(AlarmServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<AlarmDto> alarmList(String userId) {
        return sqlSession.getMapper(AlarmMapper.class).alarmList(userId);
    }

    @Override
    public int alarmBoardCreate(AlarmDto alarmDto) {
        sqlSession.getMapper(AlarmMapper.class).alarmBoardCreate(alarmDto);
        return alarmDto.getAlarm_pk();
    }

    @Override
    public int alarmFollowCreate(AlarmDto alarmDto) {
        sqlSession.getMapper(AlarmMapper.class).alarmFollowCreate(alarmDto);
        return alarmDto.getAlarm_pk();
    }

    @Override
    public int alarmBotCreateDate(BotDto botDto) {
        sqlSession.getMapper(AlarmMapper.class).alarmBotCreateDate(botDto);
        return botDto.getBot_pk();
    }

    @Override
    public int alarmUnread(String userId) {
        return sqlSession.getMapper(AlarmMapper.class).alarmUnread(userId);
    }

    @Override
    public int readAll(String userId) {
        return sqlSession.getMapper(AlarmMapper.class).readAll(userId);
    }
}
