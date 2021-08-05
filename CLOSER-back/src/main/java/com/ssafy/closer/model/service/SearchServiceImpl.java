package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.BoardDto;
import com.ssafy.closer.model.dto.SearchDto;
import com.ssafy.closer.model.mapper.SearchMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchServiceImpl implements SearchService{
    private static final Logger logger = LoggerFactory.getLogger(SearchServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<BoardDto> recentSearchAll(SearchDto searchDto) {
        return sqlSession.getMapper(SearchMapper.class).recentSearchAll(searchDto);
    }

    @Override
    public List<BoardDto> popularSearchAll(SearchDto searchDto) {
        return sqlSession.getMapper(SearchMapper.class).popularSearchAll(searchDto);
    }

    @Override
    public List<BoardDto> recentSearchGboard(SearchDto searchDto) {
        return sqlSession.getMapper(SearchMapper.class).recentSearchGboard(searchDto);
    }

    @Override
    public List<BoardDto> popularSearchGboard(SearchDto searchDto) {
        return sqlSession.getMapper(SearchMapper.class).popularSearchGboard(searchDto);
    }

    @Override
    public List<BoardDto> recentSearchLboard(SearchDto searchDto) {
        return sqlSession.getMapper(SearchMapper.class).recentSearchLboard(searchDto);
    }

    @Override
    public List<BoardDto> popularSearchLboard(SearchDto searchDto) {
        return sqlSession.getMapper(SearchMapper.class).popularSearchLboard(searchDto);
    }

    @Override
    public List<BoardDto> recentSearchFeed(SearchDto searchDto) {
        return sqlSession.getMapper(SearchMapper.class).recentSearchFeed(searchDto);
    }

    @Override
    public List<BoardDto> popularSearchFeed(SearchDto searchDto) {
        return sqlSession.getMapper(SearchMapper.class).popularSearchFeed(searchDto);
    }

    @Override
    public List<BoardDto> recentSearchOne(SearchDto searchDto) {
        return sqlSession.getMapper(SearchMapper.class).recentSearchOne(searchDto);
    }

    @Override
    public List<BoardDto> popularSearchOne(SearchDto searchDto) {
        return sqlSession.getMapper(SearchMapper.class).popularSearchOne(searchDto);
    }
}
