const apiBasePath = `${
  process.env.REACT_APP_PROXY
    ? process.env.REACT_APP_PROXY
    : window.location.origin
}`;

const apiEndPoints = {
  LOAD_USER: () => "/user",

  LOGIN_USER: () => "/user/login",

  REGISTER_USER: () => "/user/register",

  GET_RESET_PASSWORD_MAIL: () => `${apiBasePath}/user/getResetPasswordLink`,

  VERIFY_RESET_PASSWORD_MAIL: () =>
    `${apiBasePath}/user/verifyResetPasswordLink`,

  RESET_PASSWORD: () => `${apiBasePath}/user/resetPassword`,

  GET_BOOK_LIST: () => "/book/getbooklist",

  GET_BOOK: () => "/book/getbook",

  ADD_BOOK: () => "/book/addbook",

  UPDATE_BOOK: () => "/book/updatebook",

  UPDATE_CART: () => "/cart/addorupdatecart",

  UPDATE_RENTAL: () => "/rental/addorupdaterental",
};

export default apiEndPoints;
