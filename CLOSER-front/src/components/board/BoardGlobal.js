import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { getBoardList, getWeekBestList, getBestList } from '../../modules/board';
import BoardItem from './BoardItem';
import { useInView } from "react-intersection-observer"
import BoardInfinityScroll from './BoardInfinityScroll';

const style = {
  height: 100,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

function BoardGlobal({ match }) {

  const name = match.params.name
  
  const dispatch = useDispatch();

  // const { weekBestList, boardList, bestList, boardCreated, boardDeleted, boardUpdated } = useSelector((state) => state.board);

  // const [ toggle, setToggle ] = useState(true)

  // const [items, setItems] = useState([])
  // const [page, setPage] = useState(1)
  // const [loading, setLoading] = useState(false)

  // const [ref, inView] = useInView()

  // useEffect(() => {
  //   axios.post(`http://localhost:8080/board/gBoard/${name}/weekbest`)
  //   .then((res) => {
  //     dispatch(getWeekBestList(res));
  //   })
  //   .catch((err) =>{
  //     console.log(err)
  //   })

  //   axios.post(`http://localhost:8080/board/gBoard/${name}/new`)
  //   .then((res) => {
  //     dispatch(getBoardList(res));
  //   })
  //   .catch((err) =>{
  //     console.log(err)
  //   })

  //   axios.post(`http://localhost:8080/board/gBoard/${name}/best`)
  //   .then((res) => {
  //     dispatch(getBestList(res));
  //   })
  //   .catch((err) =>{
  //     console.log(err)
  //   })
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [boardCreated, boardDeleted, boardUpdated, name])

  // const onClickToggle = () => {
  //   setToggle(!toggle)
  // }


  // 서버에서 아이템을 가지고 오는 함수
  // const getItems = useCallback(async () => {
  //   setLoading(true)
  //   await axios.post(`http://localhost:8080/board/gBoard/${name}/new`)
  //   .then((res) => {
  //     console.log(res.data)
  //     setItems(prevState => [...prevState, res])
  //   })
  //   .catch((err) =>{
  //     console.log(err)
  //   })
  //   setLoading(false)
  // }, [page])

  // // `getItems` 가 바뀔 때 마다 함수 실행
  // useEffect(() => {
  //   getItems()
  // // eslint-disable-next-line
  // }, [getItems])

  // useEffect(() => {
  //   // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
  //   if (inView && !loading) {
  //     setPage(prevState => prevState + 1)
  //   }
  // // eslint-disable-next-line
  // }, [inView, loading])

  ////////////
  // const [infiniteList, setInfiniteList] = useState({
  //   productList: [],
  //   items: 5,
  //   preItems: 0
  // })

  // useEffect(()=>{
  //   console.log('########')
  //   componentDidMount();
  // }, [])

  const [itemIndex, setItemIndex] = useState(0);
const [result, setResult] = useState(Array.from({length:5}));

const _infiniteScroll = useCallback(() => {
  let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  let clientHeight = document.documentElement.clientHeight;
  console.log(scrollTop) // 스크롤되어 올라간만큼의 높이
  console.log(clientHeight) // 눈에 보이는 만큼의 높이
  console.log(scrollHeight) // 스크롤 시키지 않았을 때 전체 높이

  if(scrollTop + clientHeight >= scrollHeight) {
    setItemIndex(itemIndex + 5);
    // setResult(result.concat(video_list.slice(itemIndex+20, itemIndex+40)));
    setResult(result.concat(Array.from({length:5})));
  }
}, [itemIndex, result]);

useEffect(() => {
  window.addEventListener('scroll', _infiniteScroll, true);
  return () => window.removeEventListener('scroll', _infiniteScroll, true);
}, [_infiniteScroll]);

  return (
    <>
      <div className="home__container">
      <div className="section__container">
      {result.length}
      {result.map((video, idx) => (
        <div style={style}>{idx}</div>
        // <Video key={video.video_id} video={video} />
        ))}
      </div>
    </div>
      <div>
        {/* {infiniteList.items}
        {infiniteList.preItems}
        {infiniteList.productList.length} */}
        {/* {infiniteList.productList.map((item)=>(
          <div>{item}</div>
        ))} */}
        {/* <BoardInfinityScroll></BoardInfinityScroll> */}
      </div>
      {/* <div>
        <BoardInfinityScroll></BoardInfinityScroll>
      </div> */}
      {/* <div className="list">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            {items.length - 1 === idx ? (
              <div className="list-item" ref={ref}>
                {item.data}
              </div>
            ) : (
              <div className="list-item">
                {item.data}
              </div>
            )}
          </React.Fragment>
        ))}
      </div> */}
    </>
  )
}

export default BoardGlobal;