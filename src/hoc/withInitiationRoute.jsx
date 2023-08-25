import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {initiationActionCreator} from '../redux/actions';

import AuthService from "../api/auth";
import { Preloader } from '../components/preloader/Preloader';
import RegisterPage from '../components/pages/register/RegisterPage';

const InitiationRoute = (props) => {
  const { Component } = props;
  const initiation = useSelector((state) => state.counter.initiation);
  const dispatch = useDispatch();

  const setInitiation = value => dispatch(initiationActionCreator(value));

  useEffect(() => {
    AuthService.initiation()
      .then(res => {
        return setTimeout(() => setInitiation(res.data.initiation), 500);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);


  if (initiation === null ) {
    return <Preloader/>
  } else if (initiation === true) {
    return <Component/>;
  } else if (initiation === false) {
    return  <RegisterPage setInitiation={setInitiation}/>
  }
};

export default InitiationRoute;
