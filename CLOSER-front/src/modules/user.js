/* 초기 상태 선언 */
const initialState = {
  isLoggedIn: false,
  userToken: null,
  decodedToken: {
    sub: null,
    exp: null,
    UserId: null,
  },
  userInfo: {
    userId: '',
    nickname: '',
    password: '',
    email:  '',
    addr: '',
    homeAlone: null,
    intro: '',
    profileImg: null,
    phone: null,
    badge: [
      0
    ],
  },
  following: false,
};

/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const GET_MY_INFO = 'GET_MY_INFO';
const FOLLOW = 'FOLLOW';
const GET_FOLLOW_INFO = 'GET_FOLLOW_INFO';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const loginAction = (data) => ({
  type: LOGIN,
  data,
});
  
export const logoutAction = () => ({
  type: LOGOUT 
});

export const getMyInfoAction = (data) => ({
  type: GET_MY_INFO,
  data,
});

export const followAction = () => ({
  type: FOLLOW,
});

export const getFollowInfoAction = () => ({
  type: GET_FOLLOW_INFO,
});



/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
  const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const jwt = require('jsonwebtoken');
      const decodedToken = jwt.decode(action.data.jwtAuthToken)
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.data.jwtAuthToken,
        decodedToken: decodedToken,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userToken: '',
        decodedToken: '',
        userInfo: null,
      };
    case GET_MY_INFO:
      return {
        ...state,
        userInfo: action.data
      };
    case FOLLOW:
      return {
        ...state,
        following: true,
      };
    case GET_FOLLOW_INFO:
      return {
        ...state,
        following: false,
      };
    default:
      return state;
  }
}

export default reducer;