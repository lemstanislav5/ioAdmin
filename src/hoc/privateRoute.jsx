import { Navigate, Outlet } from "react-router-dom";
import AuthStore from "../store/store";
import { observer } from "mobx-react-lite";

const PrivateRoute = (props) => {
  const { Component } = props;
  console.log(AuthStore.isLoadingAuth, AuthStore.isAuth);
  if (AuthStore.isLoadingAuth) {
    return <div>Checking auth...</div>;
  }
  if (AuthStore.isAuth) {
     return <Component/>
  } else {
    return <Navigate to="/signin" />;
  }
};

export default observer(PrivateRoute);
