
/*
Логика: каждый энд поинт имеет свой соответствует своему компаненту, имеющему собственный локальный стейт,   
HOC "PrivateRoute" служит для проверки валидного токена, в случае успеха запскает компонент подключающися к сервису 
через сокет

return instance.get("/api/refresh");
нет ответа с сервера
  1. отсылать логин и пароль на сервер для получения jwt
  2. Сохранение jwt в store mobx
  3. Приватные страницы ХОК
  4. При авторизации подключать socket.io с jwt
  5. Загрузка данных
  6. Структура данных (сообщения, прочтитано, статус)
*/

import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import LoginPage from './components/pages/authorization/LoginPage';
import { Messages } from './components/pages/messages/Messages';
import Container from 'react-bootstrap/Container';
import TopMenu from './components/top/TopMenu';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from './hoc/privateRoute';
import RegisterPage from './components/pages/register/RegisterPage';



import 'bootstrap/dist/css/bootstrap.min.css';

//initiation
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/messages",
      element: <PrivateRoute  Component={ Messages } /> ,
    },
    {
      path: "/register", 
      element: <RegisterPage /> ,
    }
  ]);

  return (
    <Container fluid>
      <TopMenu/>
      <RouterProvider router={router} />
    </Container>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
