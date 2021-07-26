package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.CommentDto;
import com.ssafy.closer.model.mapper.CommentMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {
    private static final Logger logger = LoggerFactory.getLogger(CommentServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

    @Override
    public void addComment(CommentDto commentDto) { sqlSession.getMapper(CommentMapper.class).addComment(commentDto); }

    @Override
    public void deleteComment(CommentDto commentDto) { sqlSession.getMapper(CommentMapper.class).deleteComment(commentDto); }

    @Override
    public int isComment(CommentDto commentDto) { return sqlSession.getMapper(CommentMapper.class).isComment(commentDto); }

    @Override
    public int countComment(CommentDto commentDto) { return sqlSession.getMapper(CommentMapper.class).countComment(commentDto); }

    @Override
    public void deleteAllComment(CommentDto commentDto) { sqlSession.getMapper(CommentMapper.class).deleteAllComment(commentDto); }
}
