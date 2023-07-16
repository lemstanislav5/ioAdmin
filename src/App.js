/*
return instance.get("/api/refresh");
нет ответа с сервера
  1. отсылать логин и пароль на сервер для получения jwt
  2. Сохранение jwt в store mobx
  3. Приватные страницы ХОК
  4. При авторизации подключать socket.io с jwt
  5. Загрузка данных
  6. Структура данных (сообщения, прочтитано, статус)
*/

import React, { useEffect, useState } from 'react';
import LoginPage from './components/pages/authorization/LoginPage';
import Messages from './components/pages/messages/Messages';
import Container from 'react-bootstrap/Container';
import TopMenu from './components/top/TopMenu';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from './hoc/privateRoute';
import AuthService from "./api/auth";


import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthInProgress, setIsAuthInProgress] = useState(false);

  useEffect(() => {
    console.log(isAuth, isAuthInProgress)
    if (isAuth || isAuthInProgress) return null;
    setIsAuthInProgress(true);
    AuthService.refreshToken()
      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.data.token);
        setIsAuth(true);
      })
      .catch((err) => {
        console.log("login error", err);
      })
      .finally (() => {
        setIsAuthInProgress(false);
      })
  }, []);
  console.log(isAuth, isAuthInProgress)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/signin",
      element: <LoginPage />,
    },
    {
      path: "/messages",
      element: <PrivateRoute  Component={ Messages } test={{isAuth, isAuthInProgress}}/> ,
    },
  ]);

  return (
    <Container fluid>
      <TopMenu/>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Container>
  );
};

export default App;
