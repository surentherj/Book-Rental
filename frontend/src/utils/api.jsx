import axios from "axios";

export const apiBaseURL = `${
  process.env.REACT_APP_PROXY
    ? process.env.REACT_APP_PROXY
    : window.location.origin
}`;

const api = axios.create({
  // API BASE PATH
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (request) => {
    if (localStorage.getItem("basictoken"))
      request.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "basictoken"
      )}`;
    return request;
  },
  (error) => Promise.reject(error)
);

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/
api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.data.code === "logout") {
      localStorage.clear();
      window.location.reload();
      Logout();
    }
    return Promise.reject(err);
  }
);

export const Logout = () => {
  localStorage.clear();
};

export default api;
