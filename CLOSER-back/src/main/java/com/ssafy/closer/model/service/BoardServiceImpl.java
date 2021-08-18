package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.BoardDto;
import com.ssafy.closer.model.dto.JoinDto;
import com.ssafy.closer.model.mapper.BoardMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

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
    public List<BoardDto> feedListAll(int page) {
        return sqlSession.getMapper(BoardMapper.class).feedListAll(page);
    }

    @Override
    public List<BoardDto> feedListNear(Map<String, Object> info) {
        return sqlSession.getMapper(BoardMapper.class).feedListNear(info);
    }

    @Override
    public List<BoardDto> feedListFollow(Map<String, Object> info) {
        return sqlSession.getMapper(BoardMapper.class).feedListFollow(info);
    }

    @Override
    public int gBoardCreate(BoardDto boardDto) {
        sqlSession.getMapper(BoardMapper.class).gBoardCreate(boardDto);
        return boardDto.getBoard_pk();
    }

    @Override
    public int lBoardCreate(BoardDto boardDto) {
        sqlSession.getMapper(BoardMapper.class).lBoardCreate(boardDto);
        return boardDto.getBoard_pk();
    }

    @Override
    public int feedCreate(BoardDto boardDto) {
        sqlSession.getMapper(BoardMapper.class).feedCreate(boardDto);
        return boardDto.getBoard_pk();
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

    @Override
    public boolean addJoin(JoinDto joinDto) {
        return sqlSession.getMapper(BoardMapper.class).addJoin(joinDto)==1;
    }

    @Override
    public boolean cancelJoin(JoinDto joinDto) {
        return sqlSession.getMapper(BoardMapper.class).cancelJoin(joinDto)==1;
    }

    @Override
    public boolean isJoin(JoinDto joinDto) {
        return sqlSession.getMapper(BoardMapper.class).isJoin(joinDto)==1;
    }

    @Override
    public boolean changeJoinCnt(int board_pk) {
        return sqlSession.getMapper(BoardMapper.class).changeJoinCnt(board_pk)==1;
    }

    @Override
    public int countJoin(int board_pk){
        return sqlSession.getMapper(BoardMapper.class).countJoin(board_pk);
    }

    @Override
    public int countFeedAll() {
        return sqlSession.getMapper(BoardMapper.class).countFeedAll();
    }

    @Override
    public int countFeedNear(String location) {
        return sqlSession.getMapper(BoardMapper.class).countFeedNear(location);
    }

    @Override
    public int countFeedFollow(String userId) {
        return sqlSession.getMapper(BoardMapper.class).countFeedFollow(userId);
    }

    @Override
    public int commentKind(int board_pk) {
        return sqlSession.getMapper(BoardMapper.class).commentKind(board_pk);
    }
}
