package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.CommentDto;
import com.ssafy.closer.model.mapper.CommentMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    private static final Logger logger = LoggerFactory.getLogger(CommentServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<CommentDto> commentList(CommentDto commentDto) { return sqlSession.getMapper(CommentMapper.class).commentList(commentDto); }

    @Override
    public boolean createComment(CommentDto commentDto) { return sqlSession.getMapper(CommentMapper.class).createComment(commentDto)==1; }

    @Override
    @Transactional
    public boolean deleteComment(int comment_pk) { return sqlSession.getMapper(CommentMapper.class).deleteComment(comment_pk)==1; }

    @Override
    public int isComment(CommentDto commentDto) { return sqlSession.getMapper(CommentMapper.class).isComment(commentDto); }

    @Override
    public int countComment(CommentDto commentDto) { return sqlSession.getMapper(CommentMapper.class).countComment(commentDto); }

    @Override
    public String findCommentUser(int comment_pk) { return sqlSession.getMapper(CommentMapper.class).findCommentUser(comment_pk); }
}
