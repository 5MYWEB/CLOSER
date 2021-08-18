import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { getBoardList, getWeekBestList, getBestList } from '../../modules/board';
import BoardWeekBestItem from './BoardWeekBestItem';
import BoardItem from './BoardItem';
import { Row, Col, Container } from 'react-bootstrap';

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
        <div className="fs-3 ms-3 mt-3 fw-bold">
          이번주 <span className="fw-bolder" style={{color: "#5552FF"}}>베스트</span> {name === 'recipe' ? '레시피' : name ==='tip' ? '자취 꿀팁' : name === 'deco' ? '홈데코' : '' }
        </div>
        
        {/* 목록이 비어있지 않다면 목록을 불러옴*/}
        {weekBestList && weekBestList.length !== 0 
          ? 
          <Container className="px-0">
            <Row className="g-0">
              {weekBestList.map((board) => {
                return (
                  <Col xs={6} key={board.board_pk}>
                    <BoardWeekBestItem board={board} />
                  </Col>
                );
              })}
            </Row>
          </Container>
          :
          <Container className="px-0">
            <Row className="g-0 mt-2 text-center">
              이번주 베스트 게시글이 없습니다 :(
            </Row>
          </Container>
          
        } 

      </div>
      <hr />

      {toggle ?
        <div>
          {/* 토글 버튼 */}
          <div className="fs-3 d-flex justify-content-between align-items-center">
            <span className="ms-3 fw-bold"><span className="fw-bolder" style={{color: "#5552FF"}}>최신</span> {name === 'recipe' ? '레시피' : name ==='tip' ? '자취 꿀팁' : name === 'deco' ? '홈데코' : '' }</span>
            <button className="ripple-button cbtn cbtn-sm cbtn-primary" onClick={onClickToggle}>인기순</button>
          </div>
          
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
              <Row className="g-0 mt-2">
                게시판이 비어있어요 <br/> 첫 게시물을 남겨보세요!
              </Row>
            </div>
          }
        </div>
        :
        <div>
          {/* 토글 버튼 */}
          <div className="fs-3 d-flex justify-content-between align-items-center">
            <span className="ms-3 fw-bold"><span className="fw-bolder" style={{color: "#5552FF"}}>인기</span> {name === 'recipe' ? '레시피' : name ==='tip' ? '자취 꿀팁' : name === 'deco' ? '홈데코' : '' }</span>
            <button className="ripple-button cbtn cbtn-sm cbtn-primary" onClick={onClickToggle}>최신순</button>
          </div>
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
            <Container className="px-0">
              <Row className="g-0 mt-2">
                게시판이 비어있어요 <br/> 첫 게시물을 남겨보세요!
              </Row>
            </Container> 
          } 
        </div>
      }
    </>
  )
}

export default BoardGlobal;