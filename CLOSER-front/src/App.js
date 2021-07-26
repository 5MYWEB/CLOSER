import React from 'react';
// import React, { useState } from 'react';
import { TopAppBar, Navbar } from './components/frame/index';


function App() {
  // const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  // const [ isSignedUp, setIsSignedUp ] = useState(false)

  return (
    <div>
      <TopAppBar />
      <Navbar />
    </div>
  );
}

export default App;
