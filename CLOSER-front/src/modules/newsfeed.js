/* 초기 상태 선언 */
const initialState = {
  feedList: null,
  feedCreated: false,
  feedDeleted: false,
};

/* 액션 타입 만들기 */
const CREATE_FEED = 'CREATE_LIST';
const GET_FEED_LIST = 'GET_FEED_LIST';
const DELETE_FEED = 'DELETE_FEED';

/* 액션 생성함수 만들기 */
export const createFeed = () => {
  return {
    type: CREATE_FEED,
  }
};

export const getFeedList = (data) => {
  return {
    type: GET_FEED_LIST,
    data,
  }
};

export const deleteFeed = () => {
  return {
    type: DELETE_FEED,
  }
};

/* 리듀서 선언 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FEED:
      return {
        ...state,
        feedCreated: true,
      };
    case GET_FEED_LIST:
      return {
        ...state,
        feedList: action.data.data,
        feedCreated: false,
        feedDeleted: false,
      };
    case DELETE_FEED:
      return {
        ...state,
        feedDeleted: true,
      };
    default:
      return state;
  }
};

export default reducer;