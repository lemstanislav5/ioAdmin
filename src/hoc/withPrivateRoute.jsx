import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import AuthService from "../api/auth";
import { Preloader } from '../components/preloader/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { authenticationActionCreator } from '../redux/actions';

const PrivateRoute = (props) => {
  debugger
  const { Component } = props;
  const token = useSelector((state) => state.auth.token);
  const [access, setAccess] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {

    AuthService.access()
      .then(res => (res.data.access))
      .then(res => {
        if (res) {
          setAccess(res); //true
        } else {
          AuthService.refreshToken()
            .then(res => {
              if (!res.data.access) return setTimeout(() => setAccess(false), 500);
              const { token, login } = res.data.access;
              console.log(token, login)
              //! dispatch(authenticationActionCreator(token, login));
              //! setAccess(true);
              //! console.log('AuthService.refreshToken', res.data.access);
            })
            .catch((err) => {
              return setTimeout(() => setAccess(false), 500);
              console.error("AuthService.refreshToken Ошибка авторизации: ", err);
            })
        }

      })
      .catch((err) => {
        return setTimeout(() => setAccess(false), 500);
        console.error("Ошибка авторизации: ", err);
      })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  if (access === null) {
    return <Preloader />
  } else if (access === true) {
    return <Component token={token} />;
  } else if (access === false) {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
