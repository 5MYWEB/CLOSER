import React from 'react';
import { Link } from 'react-router-dom';
import { bubble as Menu } from 'react-burger-menu'
import './Sidebar.css'



class Sidebar extends React.Component {
  constructor(props) { // render 함수보다 먼저 실행이 되면서 그 컴포넌트를 초기화를 담당
    super(props);
    this.state = {
      menuOpen: false
    }
  }

  // 닫고 연 상태의 싱크를 맞춰줌
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  // 메뉴를 닫을 때
  closeMenu () {
    this.setState(()=>{this.menuOpen = false})
  }

  // 메뉴를 토글할 때
  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    if (this.state.menuOpen) {return (
      <div>
      <Menu
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}
      >
        <button onClick={() => this.closeMenu()}>SideBar</button>
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
            <Link to="/" onClick={() => this.closeMenu()}>로그아웃</Link>
          </li>
          <li>
            <Link to="/signup" onClick={() => this.closeMenu()}>회원가입</Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => this.closeMenu()}>프로필</Link>
          </li>
        </ul>
      </Menu>
      <p onClick={() => this.toggleMenu()}>Custom Icon</p>
      </div>
    );
    } else {
      return (
        <Menu isOpen={this.state.menuOpen}>
          <h2>SideBar</h2>
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
              <Link to="/" onClick={this.handleStatus}>로그아웃</Link>
            </li>
            <li>
              <Link to="/signup" onClick={this.handleStatus}>회원가입</Link>
            </li>
            <li>
              <Link to="/profile" onClick={this.handleStatus}>프로필</Link>
            </li>
          </ul>
        </Menu>
      )
    }
  }
}

export default Sidebar;