// useFetch.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(page, name, addr, userId) {
  console.log('잘됨',page)
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
      await setList((prev) => [...new Set([...prev, ...res.data.data])]);
      await setHasMore(res.data.hasmore);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [addr, name, page]);

  useEffect(() => {
    sendBoard();
  }, [sendBoard, page]);
  return { loading, error, list, hasMore };
}

export default useFetch;