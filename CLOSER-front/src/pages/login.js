import React, { useState, useCallback } from 'react';

function Login(props) {
  const [userInputs, setUserInputs] = useState({
    userId: '',
    password: ''
  });

  const { userId, password } = userInputs;

  const onChange=useCallback(
    e => {
      const { name, value } = e.target;
      console.log(name, value);
      setUserInputs({
        ...userInputs,
        [name]: value
      });
    },
    [userInputs]
  );
  const onSubmit=(
    e => {
      e.preventDefault();
      console.log(userInputs.userId);
      console.log(userInputs.password);
      props.setIsLoggedIn(true);
    }
  )

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="userId"
        value={userId}
        onChange={onChange}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <button type="submit">
        Login
      </button>
    </form>
  )
}

export default Login;