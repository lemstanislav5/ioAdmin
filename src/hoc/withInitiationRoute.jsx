import React, { useEffect, useState } from 'react';
import AuthService from "../api/auth";
import { Preloader } from '../components/preloader/Preloader';
import RegisterPage from '../components/pages/register/RegisterPage';

const InitiationRoute = (props) => {
  const { Component } = props;
  const [initiation, setInitiation] = useState(null);

  useEffect(() => {
    AuthService.initiation()
      .then(res => {
        console.log('res.data.initiation: ', res)
        if (res.data && res.data.initiation === false) 
          return setTimeout(() => setInitiation(false), 500);
        return setTimeout(() => setInitiation(true), 500);
      })
      .catch((err) => {
        setTimeout(() => setInitiation(false), 500);
        console.log(err)
      })
      .finally (() => {
        setTimeout(() => setInitiation(false), 500);
      });
  }, []);


  if (initiation === null ) {
    return <Preloader/>
  } else if (initiation === true) {
    return <Component/>;
  } else if (initiation === false) {
    return  <RegisterPage />
  }
};

export default InitiationRoute;
