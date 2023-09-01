import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import AuthService from "../api/auth";
import { Preloader } from '../components/preloader/Preloader';

const PrivateRoute = (props) => {
  const { Component } = props;
  const [access, setAccess] = useState(null);
  useEffect(() => {

    AuthService.messages()
      .then(res => {
        console.log(res.data.access)
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
    return <Component />;
  } else if (access === false) {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
