import React from 'react';
import { useSelector } from 'react-redux';
import BoardItem from '../board/BoardItem';


function SearchedList() {

  const { searchedList } = useSelector((state) => state.search);

  return (
    <div>
    {/* 검색목록이 비어있지 않다면 목록을 불러옴*/}
    {searchedList && searchedList.length !== 0 ? 
      <div>
        {searchedList.map((board) => {
          return (
            <BoardItem key={board.board_pk} board={board} />
          );
        })}
      </div>
      : 
      <div>
        검색내역이 없습니다:(
      </div>
      }
  </div>
  )
}

export default SearchedList;