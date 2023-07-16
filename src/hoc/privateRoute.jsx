import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";

const PrivateRoute = (props) => {
  const { Component, test } = props;
  console.log(test);
  if (test.isLoadingAuth) {
    return <div>Checking auth...</div>;
  }
  if (test.isAuth) {
     return <Component/>
  } else {
    return <Navigate to="/signin" />;
  }
};

export default observer(PrivateRoute);
