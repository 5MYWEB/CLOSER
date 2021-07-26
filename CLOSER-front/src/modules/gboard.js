/* 액션 타입 만들기 */
// const LOGIN = 'user/LOGIN';


/* 액션 생성함수 만들기 */
// export const loginAction = (data) => ({
//   type: LOGIN,
//   data,
//   });


/* 초기 상태 선언 */
const initialState = {
  gBoardPk: null,
  userId: '',
  title: '',
  content: '',
  created_at: '',
  updated_at: '',
  category: null,
};

/* 리듀서 선언 */
export default function gboard(state = initialState, action) {
  switch (action.type) {
    // case LOGIN:
    //   return {
    //     ...state,
    //     isLoggedIn: true,
    //     jwtAuthToken: action.data.jwtAuthToken,
    //     // Decoded Token으로 정보 받아오기
    //     user: 'unknown',
    //   };
    default:
      return state;
  }
}