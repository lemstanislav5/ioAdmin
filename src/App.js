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

import React, { useEffect } from 'react';
import Signin from './components/pages/authorization/Signin';
import Messages from './components/pages/messages/Messages';
import Container from 'react-bootstrap/Container';
import TopMenu from './components/top/TopMenu';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from './hoc/PrivateRoute';

import { observer } from "mobx-react-lite";
import AuthStore from "./store/store.js";

import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/messages",
    element: <PrivateRoute  Component={ Messages }/> ,
  },
]);


const App = observer(() => {
  useEffect(() => {
    AuthStore.checkAuth();
  }, []);

  return (
    <Container fluid>
      <TopMenu/>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Container>
  );
});

export default App;
