package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.FollowDto;
import com.ssafy.closer.model.mapper.FollowMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowServiceImpl implements FollowService {
    private static final Logger logger = LoggerFactory.getLogger(FollowServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

    @Override
    public void follow(FollowDto followDto){
        sqlSession.getMapper(FollowMapper.class).follow(followDto);
    }

    @Override
    public void unfollow(FollowDto followDto){
        sqlSession.getMapper(FollowMapper.class).unfollow(followDto);
    }

    @Override
    public int isFollow(FollowDto followDto){
        return sqlSession.getMapper(FollowMapper.class).isFollow(followDto);
    }

    @Override
    public int countActiveUser(FollowDto followDto){
        return sqlSession.getMapper(FollowMapper.class).countActiveUser(followDto);
    }

    @Override
    public int countPassiveUser(FollowDto followDto){
        return sqlSession.getMapper(FollowMapper.class).countPassiveUser(followDto);
    }

    @Override
    public List<FollowDto> activeUserList(String passiveUser){
        return sqlSession.getMapper(FollowMapper.class).activeUserList(passiveUser);
    }

    @Override
    public List<FollowDto> passiveUserList(String passiveUser){
        return sqlSession.getMapper(FollowMapper.class).passiveUserList(passiveUser);
    }
}
