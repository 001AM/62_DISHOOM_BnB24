import React, { useState } from 'react';
import ExampleContext from './Context';
import { useEffect } from 'react';

const State = (props) => {
  const [userid, setUserid] = useState(null);
  const [username, setUsername] = useState(null);
  const [isLogin, setLogin] = useState();
  const [onpage, setPage] = useState('');
  const [theme, setTheme] = useState('light');
  

  const contextValue = {
    username:username,
    setUsername:setUsername,
    userid:userid,
    setUserid:setUserid,
    isLogin: isLogin,
    setLogin: setLogin,
    onpage: onpage,
    setPage: setPage,
    istheme: theme,
    setisTheme: setTheme,

  };
  useEffect(() => {
    if(localStorage.getItem('access_token')) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [localStorage.getItem('access_token')])
  
  return <ExampleContext.Provider value={contextValue}>{props.children}</ExampleContext.Provider>;
};

export default State;
