/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_DIFF = 'user/SET_DIFF';
const INCREASE = 'user/INCREASE';
const DECREASE = 'user/DECREASE';
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setDiffAction = diff => ({ type: SET_DIFF, diff });
export const increaseAction = () => ({ type: INCREASE });
export const decreaseAction = () => ({ type: DECREASE });
export const loginAction = (data) => ({
  type: LOGIN,
  data,
  });
export const logoutAction = () => ({ type: LOGOUT });

/* 초기 상태 선언 */
const initialState = {
  isLoggedIn: false,
  userToken: '',
  decodedToken: {
    sub: '',
    exp: '',
    UserId: '',
  },
  userId: '',
  // number: 0,
  // diff: 1
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
  const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_DIFF:
    //   return {
    //     ...state,
    //     diff: action.diff
    //   };
    // case INCREASE:
    //   return {
    //     ...state,
    //     number: state.number + state.diff
    //   };
    case LOGIN:
      const jwt = require('jsonwebtoken');
      const decodedToken = jwt.decode(action.data.jwtAuthToken)
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.data.jwtAuthToken,
        decodedToken: decodedToken,
        userId: decodedToken.UserId,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userToken: '',
        decodedToken: '',
        userId: null,
      };
    default:
      return state;
  }
}

export default reducer;