import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import AuthService from "../api/auth";
import { Preloader } from '../components/preloader/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { authenticationActionCreator } from '../redux/actions';

const PrivateRoute = (props) => {
  const { Component } = props;
  const token = useSelector((state) => state.counter.token);
  const [access, setAccess] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    AuthService.access()
      .then(res => (res.data.access))
      .then(res => {
        console.log(res)
        if (res) {
          setIsAuthInProgress(res);
          setAccess(res);
        } else {
          AuthService.refreshToken()
            .then(res => {
              console.log('AuthService.refreshToken', res);
            })
            .catch((err) => {
              setIsAuthInProgress(null);
              console.error("AuthService.refreshToken Ошибка авторизации: ", err);
            })
    // }
        }

      })
      .catch((err) => {
        setIsAuthInProgress(null);
        console.error("Ошибка авторизации: ", err);
      })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  if (access === null) {
    return <Preloader/>
  } else if (access === true) {
    return <Component token={token} />;
  } else if (access === false) {
    return <Navigate to="/login" />;
  }};

export default PrivateRoute;
