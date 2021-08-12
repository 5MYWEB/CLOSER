// useFetch.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(page, name, addr, userId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  
    const sendBoard = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      let res
      if (name === 'total') {
        res = await axios.get(`http://localhost:8080/board/feed/${name}/${page}`);
      } else if (name === 'near') {
        res = await axios.get(`http://localhost:8080/board/feed/${name}/${page}`,{
            params: {
              location: addr
            }
        });
      } else if (name === 'follow') {
        res = await axios.get(`http://localhost:8080/board/feed/${name}/${page}`,{
            params: {
              userId: userId
            }
        });
      }
      // page가 1이면 name(near, follow, total)이 바뀌었단 뜻이므로 리스트를 초기화 한 뒤 담음 (prev 리스트와 합치지 않음)
      if (page === 1) {
        await setList([...res.data.data]);
      } else {
        await setList((prev) => [...new Set([...prev, ...res.data.data])]);
      }
      await setHasMore(res.data.hasmore);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [addr, name, page, userId]);

  useEffect(() => {
    sendBoard();
  }, [sendBoard, page]);
  return { loading, error, list, hasMore };
}

export default useFetch;