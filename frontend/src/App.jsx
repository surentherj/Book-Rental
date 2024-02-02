import { useEffect } from "react";
import { Provider } from "react-redux";
import Toast from "./components/toast";
import { loadUser } from "./redux/actions/auth";
import store from "./redux/store";
import AppRouter from "./routes";
import AuthProvider from "./utils/authProvider";

const App = () => {
  const { isAuthenticated, loginWithCustom, logout, setUserIsAuthenticated } =
    AuthProvider();

  useEffect(() => {
    store.dispatch(loadUser());
  }, [isAuthenticated]);

  useEffect(() => {
    if (
      localStorage.getItem("name") &&
      localStorage.getItem("email") &&
      localStorage.getItem("basictoken")
    )
      setUserIsAuthenticated(true);
  }, [localStorage]);

  return (
    <Provider store={store}>
      <Toast />
      <AppRouter
        isAuthenticated={isAuthenticated}
        loginWithCustom={loginWithCustom}
        logout={logout}
      />
    </Provider>
  );
};

export default App;
