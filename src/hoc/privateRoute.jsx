import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import AuthService from "../api/auth";
import { Preloader } from '../components/preloader/Preloader';

const PrivateRoute = (props) => {
  const { Component } = props;
  const [isAuthInProgress, setIsAuthInProgress] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token === null && isAuthInProgress === null) {
      setIsAuthInProgress(true);
      AuthService.refreshToken()
        .then(res => {
          localStorage.setItem("token", res.data.token);
          setTimeout(() => setToken(res.data.token), 1000);
        })
        .catch((err) => {
          setIsAuthInProgress(false);
          console.log("login error", err);
        })
        .finally (() => {
          setTimeout(() => setIsAuthInProgress(false), 1000);
        });
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (token === null && isAuthInProgress === null) {
    return <Preloader/>
  } else if (token === null && isAuthInProgress === true) {
    return <Preloader/>
  } else if (token === null && isAuthInProgress === false) {
    return <Navigate to="/signin" />;
  } else if (token) {
    return <Component token={token}/>;
  } else {
    return <Navigate to="/signin" />;
  }

};

export default PrivateRoute;
