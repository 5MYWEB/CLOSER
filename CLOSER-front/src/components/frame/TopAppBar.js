import React from 'react';
import { Route } from 'react-router-dom';
import { Sidebar } from './index'
import { Home, About, Login, SignUp, Profile } from '../../pages';

import './TopAppBar.css';

const TopAppBar = () => {
  return (
    <div>
      <h2>CLOSER</h2>
      <hr />
      <Sidebar />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" component={Profile} />


    </div>

  )
}
export default TopAppBar;