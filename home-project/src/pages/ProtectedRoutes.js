import React from "react";
import { Route, useNavigate } from "react-router-dom";

import { useEffect } from "react";


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
  }, [history]);

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
