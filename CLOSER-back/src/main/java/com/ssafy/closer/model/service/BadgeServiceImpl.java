package com.ssafy.closer.model.service;

import com.ssafy.closer.model.mapper.BadgeMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
public class BadgeServiceImpl implements BadgeService {
    private static final Logger logger = LoggerFactory.getLogger(BadgeServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

    @Scheduled(cron ="0 0 0 1 * *") // 매달 자정 삭제
    @Override
    public void deleteBadge() { sqlSession.getMapper(BadgeMapper.class).deleteBadge(); }

    @Scheduled(cron ="5 0 0 1 * *") // 매달 00시00시 05초에 badge 갱신
    @Override
    public void insertBadge1() { sqlSession.getMapper(BadgeMapper.class).insertBadge1(); }

    @Scheduled(cron ="10 0 0 1 * *") // 매달 00시00시 10초에 badge 갱신
    @Override
    public void insertBadge2() { sqlSession.getMapper(BadgeMapper.class).insertBadge2(); }

    @Scheduled(cron ="15 0 0 1 * *") // 매달 00시00시 15초에 badge 갱신
    @Override
    public void insertBadge3() { sqlSession.getMapper(BadgeMapper.class).insertBadge3(); }

    @Scheduled(cron ="20 0 0 1 * *") // autoincrease 정리
    @Override
    public void updateauto() { sqlSession.getMapper(BadgeMapper.class).updateauto(); }

}
