package com.ssafy.closer.model.service;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.ssafy.closer.model.mapper.FeedMapper;
import com.ssafy.closer.model.dto.FeedDto;

@Service
public class FeedServiceImpl implements FeedService{
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<FeedDto> FeedList() {
        return null;
    }

    @Override
    public boolean createFeed(FeedDto feedDto) {
        return false;
    }

    @Override
    public FeedDto readFeed(int feed_pk) {
        return null;
    }

    @Override
    public boolean deleteFeed(int feed_pk) {
        return false;
    }
}