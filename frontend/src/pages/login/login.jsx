import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";
import loginBanner from "../../assets/img/login-banner.png";
import {
  login,
  verifyResetPasswordLink
} from "../../redux/actions/auth";

import RamcoLogo from "../../components/icons/logo";
import MicrosoftIcon from "../../components/icons/microsoft";
import BasicLogin from "./basicLogin";
import ForgotPassword from "./forgotPassword";
import NewPassword from "./newPassword";
import Register from "./register";

const Login = ({ isAuthenticated, loginWithCustom }) => {
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(document?.location?.search);
  const resetpassword = searchParams?.get("resetpassword");

  const { resetPasswordMail, user } = useSelector((state) => ({
    resetPasswordMail: state?.auth?.resetPasswordMail,
    user: state?.auth?.user,
  }));

  useEffect(() => {
    if (resetpassword) {
      localStorage.clear();
      dispatch(verifyResetPasswordLink(resetpassword));
    }
  }, [resetpassword]);

  const classRef = useRef(null);
  useEffect(() => {
    let faqClass = document.body.className;
    classRef.current = faqClass;
    document.body.className = faqClass + " login-page";
    return () => {
      document.body.className = classRef.current;
    };
  }, []);

  const [forgotPassword, setForgotPassword] = useState(false);
  const [register, setRegister] = useState(false);
  if (isAuthenticated) {
    const pathname = localStorage.getItem("redirecturl") || "/";
    localStorage.removeItem("redirecturl");
    return <Redirect to={pathname} />;
  }

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="banner-slider">
          <div className="each-slide active">
            <div className="each-slide active text-center">
              <img src={loginBanner} alt="banner" height="450" width="650" />
              <h2 className="mt-three-s">
                Welcome to Online Book Rental Library
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <form className="forms">
          <div className="form-group">
            <div className="login-logo left">
              <div className="mb-three-s">
                <RamcoLogo />
              </div>
            </div>
          </div>

          <div className="wd-100 mt-one-s">
            {resetPasswordMail && resetpassword ? (
              <NewPassword
                email={resetPasswordMail}
                resetPasswordToken={resetpassword}
              />
            ) : forgotPassword ? (
              <ForgotPassword setForgotPassword={setForgotPassword} />
            ) : register ? (
              <Register setRegister={setRegister} />
            ) : (
              <BasicLogin
                setForgotPassword={setForgotPassword}
                loginWithCustom={loginWithCustom}
              />
            )}
            {!register && (
              <div className="mt-three-s row align-items-center card no-hover">
                Don't Have An Account?
                <div
                  onClick={() => setRegister(true)}
                  className="d-flex ml-one-s btn btn-small btn-light-primary disable-padding "
                >
                  <div className="icon-wrap icon-l">
                    <MicrosoftIcon />
                  </div>
                  <span className="mr-two-s">Sign Up</span>
                </div>
              </div>
            )}
          </div>
        </form>
        <div class="login-right-footer grey3">
          © Surenthernath J {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

export default connect(mapStateToProps, { login })(Login);
