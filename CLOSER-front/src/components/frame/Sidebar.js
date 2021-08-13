import React from 'react';
import { Link } from 'react-router-dom';
import { bubble as Menu } from 'react-burger-menu'
import { connect } from 'react-redux';
import './Sidebar.css';
import '../../styles/bootstrap.min.css';
import * as actions from '../../modules/user';

import defaultProfile from '../../assets/user-on.svg';
import homeSolid from '../../assets/sidebar/home-solid.svg';
import userSolid from '../../assets/sidebar/user-solid.svg';
import compassSolid from '../../assets/sidebar/compass-solid.svg';
import questionSolid from '../../assets/sidebar/question-solid.svg';
import signInSolid from '../../assets/sidebar/sign-in-alt-solid.svg';
import signOutSolid from '../../assets/sidebar/sign-out-alt-solid.svg';
import signUpSolid from '../../assets/sidebar/door-open-solid.svg';

class Sidebar extends React.Component {
  constructor(props) { // render 함수보다 먼저 실행이 되면서 그 컴포넌트를 초기화를 담당
    super(props);
    this.state = {
      menuOpen: false,
    }
  }

  // 닫고 연 상태의 싱크를 맞춰줌
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  // 메뉴를 닫을 때
  closeMenu () {
    this.setState({menuOpen : false})
  }

  // 이미지 없을 시 기본 이미지 생성
  handleImgError = (e) => {
    e.target.src = defaultProfile;
  }

  render () {
    const { userInfo, isLoggedIn, logoutAction, postCount } = this.props;

    // 사이드바가 열려있을때
    if (this.state.menuOpen) {
      // 비로그인시
      if(isLoggedIn === false){
        return (
          <div>
            <Menu
              isOpen={this.state.menuOpen}
              onStateChange={(state) => this.handleStateChange(state)}
            >
              <div className="bm-menu-first d-flex justify-content-center">
                <Link to="/login" onClick={() => this.closeMenu()} className="bm-profile">
                  <div className="row mx-0">
                    <div className="col-4 bm-profile-img px-0">
                      <img src={defaultProfile} alt="프로필사진" />
                    </div>
                    <div className="col-8 px-0">
                      <p className="bm-not-login-text">로그인 해주세요</p> 
                    </div>
                  </div>
                </Link>
              </div>
              <div>
                <div className="side_home">
                  <img src={homeSolid} alt="home" className="bm-icon"/>
                  <Link to="/" onClick={() => this.closeMenu()} className="link-dark">HOME</Link>
                </div>
                <div className="side_about">
                  <img src={questionSolid} alt="home" className="bm-icon"/>
                  <Link to="/about" onClick={() => this.closeMenu()} className="link-dark">ABOUT</Link>
                </div>
                <div className="side_login">
                  <img src={signInSolid} alt="home" className="bm-icon"/>
                  <Link to="/login" onClick={() => this.closeMenu()} className="link-dark">LOGIN</Link>
                </div>
                <div className="side_join">
                  <img src={signUpSolid} alt="home" className="bm-icon"/>
                  <Link to="/signup" onClick={() => this.closeMenu()} className="link-dark">JOIN</Link>
                </div>
              </div>
            </Menu>
          </div>
        );
      }else{
        // 로그인시
        return (
          <div>
            <Menu
              isOpen={this.state.menuOpen}
              onStateChange={(state) => this.handleStateChange(state)}
            >
              <div className="bm-menu-first d-flex justify-content-center">
                <Link to={`/profile/${userInfo.userId}`} onClick={() => this.closeMenu()} className="bm-profile">
                  <div className="row mx-0">
                    <div className="col-5 bm-profile-img px-0">
                      {/* { userInfo.profileImg !== null && userInfo.profileImg !== ''
                        ? <img src={userInfo.profileImg} alt="프로필사진" />
                        : <img src={defaultUserImg} alt="프로필사진" />
                      } */}
                      {/* <img src={defaultUserImg} alt="프로필사진" /> */}
                      <img src={userInfo.profileImg} onError={(e) => this.handleImgError(e)} alt="프로필사진" />
                    </div>
                    <div className="col-7 px-0">
                      <div>
                        {userInfo.nickname}
                      </div>
                      <div className="bm-profile-addr">
                        {userInfo.addr}
                      </div>
                    </div>
                    <div className="row px-0 bm-profile-info">
                      <div className="col">
                        <div>{postCount}</div>
                        <div>게시물</div>
                      </div>
                      <div className="col">
                        <div>{userInfo.following}</div>
                        <div>팔로잉</div>
                      </div>
                      <div className="col">
                        <div>{userInfo.follower}</div>
                        <div>팔로워</div>
                      </div>
                    </div>
                    <div className="bm-profile-intro">
                      <p>{userInfo.intro}</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="bm-menu-second">
                <div className="side_home">
                  <img src={homeSolid} alt="home" className="bm-icon"/>
                  <Link to="/" onClick={() => this.closeMenu()} className="link-dark">HOME</Link>
                </div>
                <div className="side_about">
                  <img src={questionSolid} alt="home" className="bm-icon"/>
                  <Link to="/about" onClick={() => this.closeMenu()} className="link-dark">ABOUT</Link>
                </div>
                <div className="side_profile">
                  <img src={userSolid} alt="home" className="bm-icon"/>
                  <Link to={`/profile/${userInfo.userId}`} onClick={() => this.closeMenu()} className="link-dark">MY PROFILE</Link>
                </div>
                <div className="side_location">
                  <img src={compassSolid} alt="home" className="bm-icon"/>
                  <Link to={`/change-location/`} onClick={() => this.closeMenu()} className="link-dark">동네 변경</Link>
                </div>
              </div>
              <div className="bm-menu-third">
                <div className="side_logout">
                  <img src={signOutSolid} alt="home" className="bm-icon"/>
                  <Link to="/" onClick={() => {this.closeMenu(); logoutAction();}} className="link-dark">LOGOUT</Link>
                </div>
              </div>
            </Menu>
          </div>
        );
      }
    } else {
      // 사이드바가 닫혀있을때
      // 비로그인시
      if(isLoggedIn === false){
        return (
          <div>
            <Menu 
              isOpen={false}
              onStateChange={(state) => this.handleStateChange(state)}
            >
            </Menu>
          </div>
        )
      }
      else{
        // 로그인시
        return (
          <div>
            <Menu 
              isOpen={false}
              onStateChange={(state) => this.handleStateChange(state)}
            >
            </Menu>
          </div>
        )
      }
    }
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  isLoggedIn: state.user.isLoggedIn,
  postCount: state.user.postCount
});

const mapDispatchToProps = (dispatch) => ({
  logoutAction: () => dispatch(actions.logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);