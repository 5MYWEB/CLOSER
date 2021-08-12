import React, { useRef, useState, useCallback, useEffect  } from 'react';
import { NaverMap } from 'react-naver-maps';
import { useSelector } from 'react-redux';
import useFetch from "../../hooks/useFetch";
import BoardItem from '../board/BoardItem';
// import { getBoardList } from '../../modules/board';


const NewsfeedHot = ({match}) => {

  // 리덕스의 boardList, boardCreated, boardDeleted 불러옴
  // const { boardList, boardCreated, boardDeleted } = useSelector((state) => state.board);

  const userId  = useSelector((state) => state.user.userInfo.userId);
  const addr  = useSelector((state) => state.user.userInfo.addr);
  const name = match.params.name
  
  // infinite scroll
  const [pageNum, setPageNum] = useState(1);
  const { loading, error, list, hasMore } = useFetch(pageNum, name, addr, userId);

  const observer = useRef();
  const lastBoardElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNum((prev) => prev + 1);
        }
      });
    if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setPageNum(1)
  }, [name])

    
  return (
    <div className="App">
      {list.map((board, i) => {
        const isLastElement = (list.length === i + 1);
        return (
        isLastElement
        ? 
        <BoardItem key={i} board={board} ref={lastBoardElementRef}/>
        : 
        <BoardItem key={i} board={board}/>
        )
      })}

      <div>{loading && "Loading..."}</div>
      <div>{error && "Error..."}</div>
    </div>
  );
}

export default NewsfeedHot;