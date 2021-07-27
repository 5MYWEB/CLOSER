package com.ssafy.closer.model.mapper;

import com.ssafy.closer.model.dto.BookmarkDto;

public interface BookmarkMapper {

    // 북마크
    void addBookmark(BookmarkDto bookmarkDto);

    // 북마크 취소
    void cancelBookmark(BookmarkDto bookmarkDto);

    // 북마크 유무
    int isBookmark(BookmarkDto bookmarkDto);

    // 북마크 갯수
    int countBookmark(BookmarkDto bookmarkDto);

    // 해당 글이 삭제되면 관련된 행 삭제
    void deleteBookmark(BookmarkDto bookmarkDto);

}
