package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.BoardDto;
import com.ssafy.closer.model.mapper.BoardMapper;
import com.ssafy.closer.model.mapper.GBoardMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public List<BoardDto> lBoardList1(String location) {
        return sqlSession.getMapper(BoardMapper.class).lBoardList1(location);
    }

    @Override
    public List<BoardDto> lBoardList2(String location) {
        return sqlSession.getMapper(BoardMapper.class).lBoardList2(location);
    }

    @Override
    public List<BoardDto> lBoardList3(String location) {
        return sqlSession.getMapper(BoardMapper.class).lBoardList3(location);
    }

    @Override
    public boolean gBoardCreate(BoardDto boardDto) {
        return sqlSession.getMapper(BoardMapper.class).gBoardCreate(boardDto)==1;
    }

    @Override
    public boolean lBoardCreate(BoardDto boardDto) {
        return sqlSession.getMapper(BoardMapper.class).lBoardCreate(boardDto)==1;
    }

    @Override
    public boolean feedCreate(BoardDto boardDto) {
        return sqlSession.getMapper(BoardMapper.class).feedCreate(boardDto)==1;
    }

    @Override
    public BoardDto read(int board_pk) {
        return sqlSession.getMapper(BoardMapper.class).read(board_pk);
    }

    @Override
    public boolean gBoardUpdate(BoardDto boardDto) {
        return sqlSession.getMapper(BoardMapper.class).gBoardUpdate(boardDto)==1;
    }

    @Override
    public boolean lBoardUpdate(BoardDto boardDto) {
        return sqlSession.getMapper(BoardMapper.class).lBoardUpdate(boardDto)==1;
    }

    @Override
    @Transactional
    public boolean delete(int board_pk) {
        return sqlSession.getMapper(BoardMapper.class).delete(board_pk)==1;
    }

    @Override
    public String findUser(int board_pk) {
        return sqlSession.getMapper(BoardMapper.class).findUser(board_pk);
    }

    @Override
    public boolean increaseCount(int board_pk) {
        return sqlSession.getMapper(BoardMapper.class).increaseCount(board_pk)==1;
    }

    @Override
    public boolean decreaseCount(int board_pk) {
        return sqlSession.getMapper(BoardMapper.class).decreaseCount(board_pk)==1;
    }

}
