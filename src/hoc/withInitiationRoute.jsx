import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {initiationActionCreator} from '../redux/actions';

import AuthService from "../api/auth";
import { Preloader } from '../components/preloader/Preloader';
import RegisterPage from '../components/pages/register/RegisterPage';

const InitiationRoute = (props) => {
  const { Component } = props;
  const initiation = useSelector((state) => state.counter.initiation);
  const dispatch = useDispatch()

  useEffect(() => {
    AuthService.initiation()
      .then(res => {
        console.log('res.data.initiation: ', res)
        return setTimeout(() => dispatch(initiationActionCreator(res.data.initiation)), 500);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally (() => {
        // setTimeout(() => setInitiation(false), 500);
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
