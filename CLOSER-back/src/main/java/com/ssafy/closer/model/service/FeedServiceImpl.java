package com.ssafy.closer.model.service;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.ssafy.closer.model.mapper.FeedMapper;
import com.ssafy.closer.model.dto.FeedDto;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FeedServiceImpl implements FeedService{
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

    @Autowired
    private FeedMapper feedMapper;

    @Override
    public List<FeedDto> feedListAll() {
        return sqlSession.getMapper(FeedMapper.class).feedListAll();
    }

    @Override
    public List<FeedDto> feedListNear(String location) {
        return sqlSession.getMapper(FeedMapper.class).feedListNear(location);
    }

    @Override
    public List<FeedDto> feedListFollow(String userId) {
        return sqlSession.getMapper(FeedMapper.class).feedListFollow(userId);
    }

    @Override
    public boolean createFeed(FeedDto feedDto) {
        return feedMapper.createFeed(feedDto)==1;
    }

    @Override
    public FeedDto readFeed(int feed_pk) {
        return sqlSession.getMapper(FeedMapper.class).readFeed(feed_pk);
    }

    @Override
    @Transactional
    public boolean deleteFeed(int feed_pk) {
        return feedMapper.deleteFeed(feed_pk) == 1;
    }
}