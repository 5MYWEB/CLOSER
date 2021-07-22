import React from 'react';
import { Link, Route } from 'react-router-dom';
import FollowerList from '../components/profile/FollowerList';
import FollowingList from '../components/profile/FollowingList';
import UserFeed from '../components/profile/UserFeed';
import UserPost from '../components/profile/UserPost';
import UserBookmark from '../components/profile/UserBookmark';

function Profile() {
  // 유저아이디, 팔로워, 팔로잉 더미데이터
  const userId = 'minsu'
  const followerList = [{ key: 2, nickname: '혜인'}, { key: 1, nickname: '지윤'}]
  const followingList = [{ key: 0, nickname: '호영'}, { key: 1, nickname: '민지'}]

  return (
    <div>
      {/* 뒤로가기 */}
      <button>뒤로가기</button>
      <div>
        {/* 프로필 사진 */}
        <img src="" alt="프로필 사진"></img>

        {/* 닉네임 */}
        <div>닉네임</div>

        {/* 자취 기간 */}
        <div>자취 기간</div>

        {/* 위치 */}
        <div>위치</div>

        {/* 뱃지 */}
        <div>뱃지</div>

        {/* 한줄 소개 */}
        <div>한줄 소개</div>

        {/* 프로필 수정 => 컴포넌트로 바꿔야 함*/}
        <button>프로필 수정</button>

        {/* 팔로우 하기 */}
        <button>팔로우</button>

        {/* DM으로 이동 */}
        <button>DM</button>

        {/* 팔로워 => 컴포넌트 */}
        <FollowerList header="팔로워 목록" data={followerList} />

        {/* 팔로잉 => 컴포넌트 */}
        <FollowingList header="팔로잉 목록" data={followingList} />

        {/* 프로필 공유 */}
        <button>프로필 공유</button>

        {/* 피드, 포스트, 북마크 => 각각 컴포넌트로 바꿔야 함 */}
        <ul>
          <li>
            {/* html속성에 상수와 variable을 같이 쓰는 방법입니다.*/}
            <Link to={ "/profile/userfeed/" + userId }>피드</Link>
          </li>
          <li>
            <Link to={"/profile/userpost/" + userId }>포스트</Link>
          </li>
          <li>
            <Link to={"/profile/userbookmark/" + userId }>북마크</Link>
          </li>
        </ul>

        <Route path="/profile/userfeed/:userId" component={UserFeed} />
        <Route path="/profile/userpost/:userId" component={UserPost} />
        <Route path="/profile/userbookmark/:userId" component={UserBookmark} />
      </div>
    </div>
  );
}

export default Profile;