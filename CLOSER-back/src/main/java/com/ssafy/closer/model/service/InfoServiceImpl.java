package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.InfoDto;
import com.ssafy.closer.model.mapper.InfoMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class InfoServiceImpl implements InfoService {
    private static final Logger logger = LoggerFactory.getLogger(InfoServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

    @Override
    public boolean addInfo(InfoDto infoDto) {
        return sqlSession.getMapper(InfoMapper.class).addInfo(infoDto)==1;
    }

    @Override
    public boolean cancelInfo(InfoDto infoDto) {
        return sqlSession.getMapper(InfoMapper.class).cancelInfo(infoDto)==1;
    }

    @Override
    public int isClicked(InfoDto infoDto) {
        return sqlSession.getMapper(InfoMapper.class).isClicked(infoDto);
    }

    @Override
    public int countInfo(InfoDto infoDto) {
        return sqlSession.getMapper(InfoMapper.class).countInfo(infoDto);
    }

    @Override
    public List<InfoDto> commentList(InfoDto infoDto) {
        return sqlSession.getMapper(InfoMapper.class).commentList(infoDto);
    }

    @Override
    public boolean createComment(InfoDto infoDto) {
        return sqlSession.getMapper(InfoMapper.class).createComment(infoDto)==1;
    }

    @Override
    @Transactional
    public boolean deleteComment(int info_pk) {
        return sqlSession.getMapper(InfoMapper.class).deleteComment(info_pk)==1;
    }

    @Override
    public String findCommentUser(int info_pk) {
        return sqlSession.getMapper(InfoMapper.class).findCommentUser(info_pk);
    }

    @Override
    public boolean addImage(InfoDto infoDto) {
        return sqlSession.getMapper(InfoMapper.class).addImage(infoDto)==1;
    }

    @Override
    public List<String> detailImage(int board_pk) {
        return sqlSession.getMapper(InfoMapper.class).detailImage(board_pk);
    }
}
