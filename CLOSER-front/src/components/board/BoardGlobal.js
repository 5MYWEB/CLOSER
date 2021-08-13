import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { getBoardList, getWeekBestList, getBestList } from '../../modules/board';
import BoardWeekBestItem from './BoardWeekBestItem';
import BoardItem from './BoardItem';

function BoardGlobal({ match }) {

  const name = match.params.name
  
  const dispatch = useDispatch();

  const { weekBestList, boardList, bestList, boardCreated, boardDeleted, boardUpdated } = useSelector((state) => state.board);

  const [ toggle, setToggle ] = useState(true)

  useEffect(() => {
    axios.post(`http://localhost:8080/board/gBoard/${name}/weekbest`)
    .then((res) => {
      dispatch(getWeekBestList(res));
    })
    .catch((err) =>{
      console.log(err)
    })

    axios.post(`http://localhost:8080/board/gBoard/${name}/new`)
    .then((res) => {
      dispatch(getBoardList(res));
    })
    .catch((err) =>{
      console.log(err)
    })

    axios.post(`http://localhost:8080/board/gBoard/${name}/best`)
    .then((res) => {
      dispatch(getBestList(res));
    })
    .catch((err) =>{
      console.log(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardCreated, boardDeleted, boardUpdated, name])

  const onClickToggle = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <div>
        이번주 베스트 {name === 'recipe' ? '레시피' : name ==='tip' ? '자취 꿀팁' : name === 'deco' ? '홈데코' : '' }
        {/* 목록이 비어있지 않다면 목록을 불러옴*/}
        {weekBestList && weekBestList.length !== 0 
          ? 
          <div>
            {weekBestList.map((board) => {
              return (
                <BoardWeekBestItem key={board.board_pk} board={board} />
              );
            })}
          </div>
          :
          <div>
            게시글이 없습니다:(
          </div>
          
        } 

      </div>
      <hr />

      {toggle ?
        <div>
          {/* 토글 버튼 */}
          최신 {name === 'recipe' ? '레시피' : name ==='tip' ? '자취 꿀팁' : name === 'deco' ? '홈데코' : '' }
          <button onClick={onClickToggle}>인기순</button>
          
          {/* 목록이 비어있지 않다면 목록을 불러옴*/}
          {boardList && boardList.length !== 0 
            ? 
            <div>
              {boardList.map((board) => {
                return (
                  <BoardItem key={board.board_pk} board={board} />
                );
              })}
            </div>
            : 
            <div>
              게시글이 없습니다:(
            </div>
          }
        </div>
        :
        <div>
          {/* 토글 버튼 */}
          인기 {name === 'recipe' ? '레시피' : name ==='tip' ? '자취 꿀팁' : name === 'deco' ? '홈데코' : '' }
          <button onClick={onClickToggle}>최신순</button>
          {/* 피드가 비어있지 않다면 피드목록을 불러옴*/}
          {boardList.length !== 0 ? 
            <div>
              {bestList.map((board) => {
                return (
                  <BoardItem key={board.board_pk} board={board} />
                );
              })}
            </div>
            : 
            <div>
              게시글이 없습니다:(
            </div>

            
            }

            
        </div>
      }
    </>
  )
}

export default BoardGlobal;