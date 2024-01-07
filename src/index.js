import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import {Provider} from "react-redux";
import store from "./redux/store";

import LoginPage from "./components/pages/login/LoginPage";
import LogoutPage from "./components/pages/logout/LogoutPage";
import {Messages} from "./components/pages/messages/Messages";
import {Setings} from "./components/pages/setings/Setings";
import Container from "react-bootstrap/Container";
import Menu from "./components/menu/Menu";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PrivateRoute from "./hoc/withPrivateRoute";
import Error404 from "./components/pages/error404/Error404";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const router = createBrowserRouter([
    {path: "/", element: <PrivateRoute Component={Messages} />},
    {path: "/messages", element: <PrivateRoute Component={Messages} />},
    {path: "/setings", element: <PrivateRoute Component={Setings} />},
    {path: "/login", element: <LoginPage />},
    {path: "/logout", element: <LogoutPage />},
    {path: "*", element: <Error404 />},
  ]);

  return (
    <Container>
      <Menu />
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
