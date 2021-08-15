import React from 'react';
import { useSelector } from 'react-redux';
import BoardItem from '../board/BoardItem';


function SearchedList() {

  const { searchedList, categoryName } = useSelector((state) => state.search);

  return (
    <div className="p-2">
    {/* 검색목록이 비어있지 않다면 목록을 불러옴*/}
    {searchedList && searchedList.length !== 0 ? 
      <div>
        "{categoryName}" 검색결과 {searchedList.length}건
        {searchedList.map((board) => {
          return (
            <BoardItem key={board.board_pk} board={board} />
          );
        })}
      </div>
      : searchedList && searchedList.length === 0 &&
        <div>
          "{categoryName}" 검색결과가 없습니다.
        </div>
      }
  </div>
  )
}

export default SearchedList;