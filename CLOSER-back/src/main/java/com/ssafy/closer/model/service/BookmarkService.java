package com.ssafy.closer.model.service;

import com.ssafy.closer.model.dto.BookmarkDto;

public interface BookmarkService {

    void addBookmark(BookmarkDto bookmarkDto);
    void cancelBookmark(BookmarkDto bookmarkDto);
    int isBookmark(BookmarkDto bookmarkDto);
    int countBookmark(BookmarkDto bookmarkDto);
    void deleteBookmark(BookmarkDto bookmarkDto);

}
