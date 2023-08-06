import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import AuthService from "../api/auth";
import { Preloader } from '../components/preloader/Preloader';

const InitiationRoute = (props) => {
  const { Component } = props;
  const [isAuthInProgress, setIsAuthInProgress] = useState(null);
  const [initiation, setInitiation] = useState(null);

  useEffect(() => {
    setIsAuthInProgress(true);
      AuthService.initiation()
        .then(res => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally (() => {
          setTimeout(() => setInitiation(false), 1000);
        });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // if (token === null && isAuthInProgress === null) {
  //   return <Preloader/>
  // } else if (token === null && isAuthInProgress === true) {
  //   return <Preloader/>
  // } else if (token === null && isAuthInProgress === false) {
  //   return <Navigate to="/signin" />;
  // } else if (token) {
  //   return <Component token={token}/>;
  // } else {
  //   return <Navigate to="/signin" />;
  // }

};

export default InitiationRoute;
