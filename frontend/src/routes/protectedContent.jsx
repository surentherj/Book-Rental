import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";

import routesList from "./routesList";

import Page404 from "../pages/redirects/page404";

const loading = (
  <div className="loader-wrapper full-page">
    <div className="rloader" />
  </div>
);

const ProtectedContent = ({ logout, isAuthenticated, location }) => {
  const { user } = useSelector((state) => ({
    user: state?.auth?.user,
  }));

  if (!isAuthenticated && !localStorage.getItem("basictoken")) {
    localStorage.setItem("redirecturl", location?.pathname || "/");
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Navbar logout={logout} />
      <SideBar />
      <Suspense fallback={loading}>
        <Switch>
          {routesList.map((route, i) => {
            return (
              route.component && (
                <Route
                  key={i}
                  path={route.path}
                  exact={route.exact}
                  render={(props) => <route.component {...props} />}
                />
              )
            );
          })}
          {user && <Route path="*" component={Page404} />}
        </Switch>
      </Suspense>
    </>
  );
};

export default ProtectedContent;
