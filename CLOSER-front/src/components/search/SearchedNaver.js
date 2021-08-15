import React from 'react';
import { useSelector } from 'react-redux';
import NaverItem from './/NaverItem';


function SearchedNaverList() {

  const { searchedNaverList } = useSelector((state) => state.search);

  return (
    <div>
    {/* 검색목록이 비어있지 않다면 목록을 불러옴 */}
    {searchedNaverList && searchedNaverList.length !== 0 &&
      <div className="p-2">
        <hr />
        네이버 블로그 검색결과
        {searchedNaverList.map((board, idx) => {
          return (
            <NaverItem key={idx} board={board} />
          );
        })}
      </div>
    }
  </div>
  )
}

export default SearchedNaverList;