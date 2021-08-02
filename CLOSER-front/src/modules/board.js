/* 초기 상태 선언 */
const initialState = {
  weekBestList: null,
  boardList: null,
  boardCreated: false,
  boardUpdated: false,
  boardDeleted: false,
};

/* 액션 타입 만들기 */
const CREATE_BOARD = 'CREATE_BOARD';
const GET_BOARD_LIST = 'GET_BOARD_LIST';
const GET_WEEK_BEST_LIST = 'GET_WEEK_BEST_LIST';
const UPDATE_BOARD = 'UPDATE_BOARD';
const DELETE_BOARD = 'DELETE_BOARD';

/* 액션 생성함수 만들기 */
export const createBoard = () => {
  return {
    type: CREATE_BOARD,
  }
};

export const getWeekBestList = (data) => {
  return {
    type: GET_WEEK_BEST_LIST,
    data
  }
};

export const getBoardList = (data) => {
  return {
    type: UPDATE_BOARD,
    data
  }
};

export const updateBoard = (data) => {
  return {
    type: DELETE_BOARD,
    data
  }
};

export const deleteBoard = () => {
  return {
    type: DELETE_BOARD,
  }
};
  

/* 리듀서 선언 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      return {
        ...state,
        boardCreated: true,
      };
    case GET_WEEK_BEST_LIST:
      return {
        ...state,
        weekBestList: action.data.data,
      };
    case GET_BOARD_LIST:
      return {
        ...state,
        boardList: action.data.data,
      };
    case UPDATE_BOARD:
      return {
        ...state,
        boardUpdated: true,
      };
    case DELETE_BOARD:
      return {
        ...state,
        boardDeleted: true,
      };
    default:
      return state;
  }
};

export default reducer;