import React, { useEffect, useState } from 'react';
import AuthService from "../../../api/auth";
import { Navigate } from "react-router-dom";
import { Preloader } from '../../../components/preloader/Preloader';

export default function LogoutPage() {
  const [isLogout, setIsLogout] = useState(null);
  useEffect(() => {
    AuthService.logout()
      .then((res) => {
        console.log(res);
        setIsLogout(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLogout(false);
      })
      //! ОБНУЛЕНИЕ ХРАНИЛИЩА ДОЛЖНО БЫТЬ В МИДЕЛВЕР
      localStorage.clear();
  }, []);

  if (isLogout === null) return <Preloader />
  if (isLogout === true) return <Navigate to="/login" />; 
  if (isLogout === false) return <Navigate to="/login" />; 
}