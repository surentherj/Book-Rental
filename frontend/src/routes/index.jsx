import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../pages/login/login";
import Page500 from "../pages/redirects/page500";
import ProtectedContent from "./protectedContent";
import ProtectedRoute from "./protectedRoute";

const AppRouter = ({ isAuthenticated, loginWithCustom, logout }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login
            isAuthenticated={isAuthenticated}
            loginWithCustom={loginWithCustom}
          />
        </Route>
        <Route exact path="/500" component={Page500} />
        <ProtectedRoute
          path="*"
          render={(props) => (
            <ProtectedContent
              {...props}
              isAuthenticated={isAuthenticated}
              logout={logout}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
