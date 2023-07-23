import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import AuthService from "../api/auth";
import { Preloader } from '../components/preloader/Preloader';

const PrivateRoute = (props) => {
  const { Component } = props;
  const [isAuth, setIsAuth] = useState(null);
  const [isAuthInProgress, setIsAuthInProgress] = useState(null);

  useEffect(() => {
    if (isAuth === null && isAuthInProgress === null) {
      setIsAuthInProgress(true);
      AuthService.refreshToken()
        .then(res => {
          localStorage.setItem("token", res.data.token);
          setTimeout(() => setIsAuth(true), 1000);
        })
        .catch((err) => {
          setIsAuth(false);
          console.log("login error", err);
        })
        .finally (() => {
          setTimeout(() => setIsAuthInProgress(false), 1000);
        });
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (isAuth === null && isAuthInProgress === null) {
    return <Preloader/>
  } else if (isAuth === null && isAuthInProgress === true) {
    return <Preloader/>
  } else if (isAuth === null && isAuthInProgress === false) {
    return <Navigate to="/signin" />;
  } else if (isAuth === true) {
    return <Component isAuth={isAuth}/>;
  } else {
    return <Navigate to="/signin" />;
  }

};

export default PrivateRoute;
