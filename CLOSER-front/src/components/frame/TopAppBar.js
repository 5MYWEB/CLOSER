import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from './index'
// import { Home, About, Login, SignUp, Profile } from '../../pages';
import { Container, Row, Col } from 'react-bootstrap';

import './TopAppBar.css';
import closerbot from '../../assets/closerbot.png'
import search from '../../assets/search.png'

const TopAppBar = () => {
  return (
    <>
      <Container className="topappbar">
        <Row>
            <Col xs={4}></Col>
            <Col xs={4}><h2>CLOSER</h2></Col>
            <Col xs={4}></Col>
        </Row>
      <div className="topapplist">
        <Link to="/login">
          <img src={closerbot} alt="closerbot" className="closerbot" />
        </Link>
        
        <img src={search} alt="search" className="search" />
      </div>
      </Container>
      <Sidebar />
    </>
  )
}
export default TopAppBar;