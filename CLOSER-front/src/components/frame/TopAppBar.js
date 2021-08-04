import React from 'react';
import { Route } from 'react-router-dom';
import { Sidebar } from './index'
import { Home, About, Login, SignUp, Profile } from '../../pages';
import { Container, Row, Col } from 'react-bootstrap';

import './TopAppBar.css';

const TopAppBar = () => {
  return (
    <>
      <Container className="topappbar">
        <Row className="justify-content-between mt-4">
            <Col xs={3}></Col>
            <Col xs={6}><h2 className="mb-2 mt-0">CLOSER</h2></Col>
            <Col xs={3}>챗봇, 검색</Col>

          
            
            {/* <Route path="/" exact={true} component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/profile" component={Profile} /> */}
        </Row>
      </Container>
      <Sidebar />
    </>
  )
}
export default TopAppBar;