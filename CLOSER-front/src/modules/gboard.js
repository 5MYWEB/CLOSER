/* 초기 상태 선언 */
const initialState = {
  feedList: null,
};

/* 액션 타입 만들기 */
const GET_FEED_LIST = 'GET_FEED_LIST';

/* 액션 생성함수 만들기 */
export const getFeedList = (data) => {
  return {
    type: GET_FEED_LIST,
    data
  }
};
  

/* 리듀서 선언 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED_LIST:
      return {
        ...state,
        feedList: action.data.data,
      };
    default:
      return state;
  }
};

export default reducer;