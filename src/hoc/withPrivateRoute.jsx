import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import AuthService from "../api/auth";
import { Preloader } from '../components/preloader/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import {authenticationActionCreator} from '../redux/actions';

const PrivateRoute = (props) => {
  const { Component } = props;
  const token = useSelector((state) => state.counter.token);
  const [isAuthInProgress, setIsAuthInProgress] = useState(null);
  const dispatch = useDispatch();
  console.log('PrivateRoute', token, isAuthInProgress)
  useEffect(() => {
    if (token !== null && isAuthInProgress === null) {
      setIsAuthInProgress(true);
      AuthService.refreshToken()
        .then(res => {
          localStorage.setItem("token", res.data.token);
          setIsAuthInProgress(false);
          setTimeout(() => dispatch(authenticationActionCreator(res.data.token, res.data.login)), 300);
        })
        .catch((err) => {
          setIsAuthInProgress(null);
          console.error("Ошибка авторизации: ", err);
        })
        // .finally (() => {
        //   setTimeout(() => setIsAuthInProgress(null), 300);
        // });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token === null && isAuthInProgress === null) {
    return <Navigate to="/login" />;
  } else if (token && isAuthInProgress === true){
    return <Preloader/>
  } else if (token && isAuthInProgress === false) {
    return <Component token={token}/>;
  }

};

export default PrivateRoute;
