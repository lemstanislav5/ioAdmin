/*
Первое, что проверяет приложение - это иницилизация, которая заключается в создании менеждера.
Если менеджер не существует, приложение отображает форму для его создания.
Если менеджер существует приложение предлагает проводит аутентификацию по токену, после чего либо предлагает авторизоваться, либо пропускает к сообщениям.


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

import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./redux/store";

import LoginPage from "./components/pages/login/LoginPage";
import { Messages } from "./components/pages/messages/Messages";
import Container from "react-bootstrap/Container";
import TopMenu from "./components/top/TopMenu";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./hoc/withPrivateRoute";
import Error404 from "./components/pages/error404/Error404";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute Component={Messages} />,
    },
    {
      path: "/messages",
      element: <PrivateRoute Component={Messages} />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "*",
      element: <Error404 />,
    },
  ]);
  return (
    <Container>
      <TopMenu />
      <RouterProvider router={router} />
    </Container>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
window.store = store;
