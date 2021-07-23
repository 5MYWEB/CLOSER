import React from 'react';
// import React, { useState } from 'react';
import { Menu, TopAppBar, Navbar } from './components/frame/index';


function App() {
  // const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  // const [ isSignedUp, setIsSignedUp ] = useState(false)

  return (
    <div>
      <TopAppBar />
      <Navbar />
      <Menu />
    </div>
  );
}

export default App;
