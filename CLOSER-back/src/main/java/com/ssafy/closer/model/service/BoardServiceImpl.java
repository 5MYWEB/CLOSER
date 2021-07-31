package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.BoardDto;
import com.ssafy.closer.model.mapper.BoardMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {
    private static final Logger logger = LoggerFactory.getLogger(BoardServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<BoardDto> gBoardList() {
        return sqlSession.getMapper(BoardMapper.class).gBoardList();
    }

    @Override
    public List<BoardDto> gBoardWeekBestList1() {
        return sqlSession.getMapper(BoardMapper.class).gBoardWeekBestList1();
    }

    @Override
    public List<BoardDto> gBoardNewList1() {
        return sqlSession.getMapper(BoardMapper.class).gBoardNewList1();
    }

    @Override
    public List<BoardDto> gBoardBestList1() {
        return sqlSession.getMapper(BoardMapper.class).gBoardBestList1();
    }

    @Override
    public List<BoardDto> gBoardWeekBestList2() {
        return sqlSession.getMapper(BoardMapper.class).gBoardWeekBestList2();
    }

    @Override
    public List<BoardDto> gBoardNewList2() {
        return sqlSession.getMapper(BoardMapper.class).gBoardNewList2();
    }

    @Override
    public List<BoardDto> gBoardBestList2() {
        return sqlSession.getMapper(BoardMapper.class).gBoardBestList2();
    }

    @Override
    public List<BoardDto> gBoardWeekBestList3() {
        return sqlSession.getMapper(BoardMapper.class).gBoardWeekBestList3();
    }

    @Override
    public List<BoardDto> gBoardNewList3() {
        return sqlSession.getMapper(BoardMapper.class).gBoardNewList3();
    }

    @Override
    public List<BoardDto> gBoardBestList3() {
        return sqlSession.getMapper(BoardMapper.class).gBoardBestList3();
    }

    @Override
    public List<BoardDto> lBoardList1() {
        return sqlSession.getMapper(BoardMapper.class).lBoardList1();
    }

    @Override
    public List<BoardDto> lBoardList2() {
        return sqlSession.getMapper(BoardMapper.class).lBoardList2();
    }

    @Override
    public List<BoardDto> lBoardList3() {
        return sqlSession.getMapper(BoardMapper.class).lBoardList3();
    }
}
