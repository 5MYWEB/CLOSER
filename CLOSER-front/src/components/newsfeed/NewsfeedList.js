import React, { useRef, useState, useCallback, useEffect  } from 'react';
import { useSelector } from 'react-redux';
import useFetch from "../../hooks/useFetch";
import BoardItem from '../board/BoardItem';
import { Row, Container } from 'react-bootstrap';
import '../../styles/theme.css'


const NewsfeedList = ({match, history}) => {

  // 리덕스의 boardList, boardCreated, boardDeleted 불러옴
  // const { boardList, boardCreated, boardDeleted } = useSelector((state) => state.board);

  const userId  = useSelector((state) => state.user.userInfo.userId);
  const addr  = useSelector((state) => state.user.userInfo.addr);
  const name = match.params.name
  
  // infinite scroll
  const [pageNum, setPageNum] = useState(1);
  const { loading, error, list, hasMore } = useFetch(pageNum, name, addr, userId);

  const { boardCreated } = useSelector((state) => state.board)

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
  }, [name, boardCreated])


  useEffect(() => {
    if(boardCreated){
      setPageNum(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardCreated])

    
  return (
    <div className="App">
      { name === "near" &&
        <div className="ms-3 my-3 fw-bold">
          <span>내 동네:</span><span className="text-main"> {addr.split(" ").slice(1, 2).join(" ")}</span>
        </div>
      }
      { list.length === 0 &&
        <Container className="px-0">
          <Row className="g-0 my-3">
            피드글이 없습니다:(
          </Row>
        </Container>
      }
      {list.map((board, i) => {
        const isLastElement = (list.length === i + 1);
        return (
          isLastElement
          ? 
          <BoardItem key={i} board={board} name={name} ref={lastBoardElementRef}/>
          : 
          <BoardItem key={i} board={board} name={name}/>
        )
      })}

      <div>{loading && "Loading..."}</div>
      <div>{error && "Error..."}</div>
    </div>
  );
}

export default NewsfeedList;