import { useSelector } from 'react-redux'

import MyProfile from '../components/profile/MyProfile'
import OtherProfile from '../components/profile/OtherProfile'


function Profile({match}) {

  // 프로필 페이지의 파라미터로 들어온 아이디
  const id = match.params.id;

  // 현재 로그인한 사람의 아이디
  const { userId } = useSelector((state) => state.user.userInfo);

  // 두개가 같으면 마이프로필 페이지, 다르면 타인프로필 페이지
  if (userId === id) {
    return <MyProfile />
  } return <OtherProfile id={id} />
}

export default Profile;