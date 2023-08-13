import React, { useEffect, useState } from 'react';
import AuthService from "../api/auth";
import { Preloader } from '../components/preloader/Preloader';
import RegisterPage from '../components/pages/register/RegisterPage';

const InitiationRoute = (props) => {
  const { Component } = props;
  const [initiation, setInitiation] = useState(null);

  useEffect(() => {
    if (!initiation) {
      AuthService.initiation()
        .then(res => {
          console.log('res.data.initiation: ', res.data.initiation)
          if (res.data && res.data.initiation === false) 
            return setTimeout(() => setInitiation(false), 1000);
          return setTimeout(() => setInitiation(true), 1000);
        })
        .catch((err) => {
          setTimeout(() => setInitiation(false), 1000);
          console.log(err)
        })
        .finally (() => {
          setTimeout(() => setInitiation(false), 1000);
        });
    }

  }, [initiation]);


  if (initiation === null ) {
    return <Preloader/>
  } else if (initiation === true) {
    return <Component/>;
  } else if (initiation === false) {
    return  <RegisterPage />
  }
};

export default InitiationRoute;
