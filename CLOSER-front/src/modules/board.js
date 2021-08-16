/* 초기 상태 선언 */
const initialState = {
  weekBestList: null, // 이번주 베스트
  boardList: null, // 최신순 리스트(디폴트)
  bestList: null, // 인기순 리스트
  boardCreated: false,
  boardUpdated: false,
  boardDeleted: false,
  boardLiked: false,
};

/* 액션 타입 만들기 */
const CREATE_BOARD = 'CREATE_BOARD';
const RESET_CREATE_BOARD = 'RESET_CREATE_BOARD';
const GET_BOARD_LIST = 'GET_BOARD_LIST';
const GET_WEEK_BEST_LIST = 'GET_WEEK_BEST_LIST';
const GET_BEST_LIST = 'GET_BEST_LIST';
const UPDATE_BOARD = 'UPDATE_BOARD';
const DELETE_BOARD = 'DELETE_BOARD';
const LIKE_BOARD = 'LIKE_BOARD';

/* 액션 생성함수 만들기 */
export const createBoard = () => {
  return {
    type: CREATE_BOARD,
  }
};

export const resetCreateBoard = () => {
  return {
    type: RESET_CREATE_BOARD,
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
    type: GET_BOARD_LIST,
    data
  }
};

export const getBestList = (data) => {
  return {
    type: GET_BEST_LIST,
    data
  }
};

export const updateBoard = (data) => {
  return {
    type: UPDATE_BOARD,
    data
  }
};

export const deleteBoard = () => {
  return {
    type: DELETE_BOARD,
  }
};

export const likeBoard = () => {
  return {
    type: LIKE_BOARD,
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
    case RESET_CREATE_BOARD:
      return {
        ...state,
        boardCreated: false,
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
    case GET_BEST_LIST:
      return {
        ...state,
        bestList: action.data.data,
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
    case LIKE_BOARD:
      return {
        ...state,
        boardLiked: !state.boardLiked,
      };
    default:
      return state;
  }
};

export default reducer;