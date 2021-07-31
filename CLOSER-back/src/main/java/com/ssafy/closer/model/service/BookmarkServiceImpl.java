package com.ssafy.closer.model.service;

import com.ssafy.closer.model.mapper.BookmarkMapper;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookmarkServiceImpl implements BookmarkService{
    private static final Logger logger = LoggerFactory.getLogger(BookmarkServiceImpl.class);

    @Autowired
    private SqlSession sqlSession;

//    @Override
//    public void addBookmark(BookmarkDto bookmarkDto) { sqlSession.getMapper(BookmarkMapper.class).addBookmark(bookmarkDto); }
//
//    @Override
//    public void cancelBookmark(BookmarkDto bookmarkDto) { sqlSession.getMapper(BookmarkMapper.class).cancelBookmark(bookmarkDto); }
//
//    @Override
//    public int isBookmark(BookmarkDto bookmarkDto) { return sqlSession.getMapper(BookmarkMapper.class).isBookmark(bookmarkDto); }
//
//    @Override
//    public int countBookmark(BookmarkDto bookmarkDto) { return sqlSession.getMapper(BookmarkMapper.class).countBookmark(bookmarkDto); }
//
//    @Override
//    public void deleteBookmark(BookmarkDto bookmarkDto) { sqlSession.getMapper(BookmarkMapper.class).deleteBookmark(bookmarkDto); }
}
