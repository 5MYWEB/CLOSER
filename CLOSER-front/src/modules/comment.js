/* 초기 상태 선언 */
const initialState = {
  commentList: null,
  commentCreated: false,
  commentDeleted: false,
};

/* 액션 타입 만들기 */
const CREATE_COMMENT = 'CREATE_LIST';
const GET_COMMENT_LIST = 'GET_COMMENT_LIST';
const DELETE_COMMENT = 'DELETE_COMMENT';

/* 액션 생성함수 만들기 */
export const createComment = () => {
  return {
    type: CREATE_COMMENT,
  }
};

export const getCommentList = (data) => {
  return {
    type: GET_COMMENT_LIST,
    data,
  }
};

export const deleteComment = () => {
  return {
    type: DELETE_COMMENT,
  }
};

/* 리듀서 선언 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      return {
        ...state,
        commentCreated: true,
      };
    case GET_COMMENT_LIST:
      return {
        ...state,
        commentList: action.data.data,
        commentCreated: false,
        commentDeleted: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        commentDeleted: true,
      };
    default:
      return state;
  }
};

export default reducer;