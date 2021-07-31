package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.BoardDto;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.ssafy.closer.model.mapper.FeedMapper;


@Service
public class FeedServiceImpl implements FeedService{
    private static final Logger logger = LoggerFactory.getLogger(FeedServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

    @Autowired
    private FeedMapper feedMapper;


    @Override
    public List<BoardDto> feedListAll() {
        return sqlSession.getMapper(FeedMapper.class).feedListAll();
    }

    @Override
    public List<BoardDto> feedListNear(String location) {
        return sqlSession.getMapper(FeedMapper.class).feedListNear(location);
    }

    @Override
    public List<BoardDto> feedListFollow(String userId) {
        return sqlSession.getMapper(FeedMapper.class).feedListFollow(userId);
    }

//    @Override
//    public boolean createFeed(BoardDto feedDto) {
//        return false;
//    }
//
//    @Override
//    public BoardDto readFeed(int feed_pk) {
//        return null;
//    }
//
//    @Override
//    public boolean deleteFeed(int kind_pk, int board_pk) {
//        return false;
//    }
//
//    @Override
//    public String findFeedUser(int feed_pk) {
//        return null;
//    }
}