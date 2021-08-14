import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from './index'
// import { Home, About, Login, SignUp, Profile } from '../../pages';
// import { Container, Row, Col } from 'react-bootstrap';

import './TopAppBar.css';
import closerbot from '../../assets/closerbot.png'
import search from '../../assets/search.png'
import lowerlogo from '../../assets/logo-upper.png'

const TopAppBar = () => {
  return (
    <>
      <div className="topappbar">
        <div className="logo-wrapper">
          <img src={lowerlogo} alt="lowerlogo" className="logo" />
        </div>
        <div className="topapplist">
          <Link to="/login">
            <img src={closerbot} alt="closerbot" className="closerbot" />
          </Link>
          
          <Link to="/search">
            <img src={search} alt="search" className="search" />
          </Link>
        </div>
      </div>
      <Sidebar />
    </>
  )
}
export default TopAppBar;