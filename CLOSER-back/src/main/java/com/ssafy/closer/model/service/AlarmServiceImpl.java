package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.AlarmDto;
import com.ssafy.closer.model.dto.BotDto;
import com.ssafy.closer.model.mapper.AlarmMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
@Component
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

    @Scheduled(cron ="0 * * * * *") // 매일 0시 실행
    @Override
    public void alarmBotCreateDay() {
        sqlSession.getMapper(AlarmMapper.class).alarmBotCreateDay();
    }

    @Scheduled(cron ="0 * * * * *")
    @Override
    public void alarmBotCreateDate() {
        sqlSession.getMapper(AlarmMapper.class).alarmBotCreateDate();
    }

    @Override
    public int alarmBotInsert(BotDto botDto) {
        sqlSession.getMapper(AlarmMapper.class).alarmBotInsert(botDto);
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
