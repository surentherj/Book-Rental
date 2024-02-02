import React from "react";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} component={Component} />;
};

export default ProtectedRoute;
