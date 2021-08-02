/* 초기 상태 선언 */
const initialState = {
  boardList: null,
  boardCreated: null,
  boardUpdated: null,
  boardDeleted: null,
};

/* 액션 타입 만들기 */
const GET_BOARD_LIST = 'GET_BOARD_LIST';

/* 액션 생성함수 만들기 */
export const getBoardList = (data) => {
  return {
    type: GET_BOARD_LIST,
    data
  }
};
  

/* 리듀서 선언 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOARD_LIST:
      return {
        ...state,
        boardList: action.data.data,
      };
    default:
      return state;
  }
};

export default reducer;