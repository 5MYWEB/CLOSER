import React from 'react';
import { Link } from 'react-router-dom';
import { bubble as Menu } from 'react-burger-menu'
import { connect } from 'react-redux';
import './Sidebar.css'

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  isLoggedIn: state.user.isLoggedIn
});

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

  render () {
    const { userInfo, isLoggedIn } = this.props;
    
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    if (this.state.menuOpen) {
      // 비로그인시
      if(isLoggedIn === false){
        return (
          <div>
            <Menu
              isOpen={this.state.menuOpen}
              onStateChange={(state) => this.handleStateChange(state)}
            >
              <ul>
                <li>
                  <Link to="/" onClick={() => this.closeMenu()}>홈</Link>
                </li>
                <li>
                  <Link to="/about" onClick={() => this.closeMenu()}>소개</Link>
                </li>
                <li>
                  <Link to="/login" onClick={() => this.closeMenu()}>로그인</Link>
                </li>
                <li>
                  <Link to="/signup" onClick={() => this.closeMenu()}>회원가입</Link>
                </li>
              </ul>
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
              <ul>
                <li>
                  <Link to="/" onClick={() => this.closeMenu()}>홈</Link>
                </li>
                <li>
                  <Link to="/about" onClick={() => this.closeMenu()}>소개</Link>
                </li>
                <li>
                  <Link to="/" onClick={() => this.closeMenu()}>로그아웃</Link>
                </li>
                <li>
                  <Link to={`/profile/${userInfo.userId}`} onClick={() => this.closeMenu()}>프로필</Link>
                </li>
                <li>
                  <Link to={`/change-location/`} onClick={() => this.closeMenu()}>동네 변경</Link>
                </li>
              </ul>
            </Menu>
          </div>
        );
      }
    } else {
      // 비로그인시
      if(isLoggedIn === false){
        return (
          <div>
            <Menu 
              isOpen={false}
              onStateChange={(state) => this.handleStateChange(state)}
            >
              <ul>
                <li>
                  <Link to="/" onClick={this.handleStatus}>홈</Link>
                </li>
                <li>
                  <Link to="/about" onClick={this.handleStatus}>소개</Link>
                </li>
                <li>
                  <Link to="/login" onClick={this.handleStatus}>로그인</Link>
                </li>
                <li>
                  <Link to="/signup" onClick={this.handleStatus}>회원가입</Link>
                </li>
              </ul>
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
              <ul>
                <li>
                  <Link to="/" onClick={this.handleStatus}>홈</Link>
                </li>
                <li>
                  <Link to="/about" onClick={this.handleStatus}>소개</Link>
                </li>
                <li>
                  <Link to="/" onClick={this.handleStatus}>로그아웃</Link>
                </li>
                <li>
                  <Link to={`/profile/${userInfo.userId}`} onClick={() => this.closeMenu()}>프로필</Link>
                </li>
              </ul>
            </Menu>
          </div>
        )
      }
    }
  }
}

export default connect(mapStateToProps)(Sidebar);