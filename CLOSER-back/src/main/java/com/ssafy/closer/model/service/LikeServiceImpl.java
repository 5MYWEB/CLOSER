package com.ssafy.closer.model.service;

import com.ssafy.closer.model.mapper.LikeMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeServiceImpl implements LikeService {
    private static final Logger logger = LoggerFactory.getLogger(LikeServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

//    @Override
//    public void addLike(LikeDto likeDto) { sqlSession.getMapper(LikeMapper.class).addLike(likeDto); }
//
//    @Override
//    public void cancelLike(LikeDto likeDto) { sqlSession.getMapper(LikeMapper.class).cancelLike(likeDto); }
//
//    @Override
//    public int isLike(LikeDto likeDto) { return sqlSession.getMapper(LikeMapper.class).isLike(likeDto); }
//
//    @Override
//    public int countLike(LikeDto likeDto) { return sqlSession.getMapper(LikeMapper.class).countLike(likeDto); }
//
//    @Override
//    public void deleteLike(LikeDto likeDto) { sqlSession.getMapper(LikeMapper.class).deleteLike(likeDto); }
}
