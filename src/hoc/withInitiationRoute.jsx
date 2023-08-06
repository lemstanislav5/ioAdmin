import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import AuthService from "../api/auth";
import { Preloader } from '../components/preloader/Preloader';

const InitiationRoute = (props) => {
  const { Component } = props;
  const [initiation, setInitiation] = useState(null);

  useEffect(() => {
      AuthService.initiation()
        .then(res => {
          if (res.data && res.data.initiation === false) 
            return setTimeout(() => setInitiation(false), 2000);
          return setTimeout(() => setInitiation(true), 2000);
        })
        .catch((err) => {
          setTimeout(() => setInitiation(false), 2000);
          console.log(err)
        })
        .finally (() => {
          setTimeout(() => setInitiation(false), 2000);
        });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (initiation === null ) {
    return <Preloader/>
  } else if (initiation === true) {
    return <Component/>;
  } else if (initiation === false) {
    return <Navigate to="/register" />;
  }
};

export default InitiationRoute;
