import { useState } from "react";
import FormInput from "../../components/forms/input";
import EyeIcon from "../../components/icons/eye";
import EyeHiddenIcon from "../../components/icons/eyeHidden";

import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/actions/toast";
import api from "../../utils/api";
import apiEndPoints from "../../constants/apiEndPoints";
import { loadUser } from "../../redux/actions/auth";
const BasicLogin = ({ setForgotPassword, loginWithCustom }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginObj, setLoginObj] = useState({});

  const onChange = (e) => {
    setLoginObj({ ...loginObj, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    api
      .post(apiEndPoints.LOGIN_USER(), loginObj)
      .then((res) => {
        localStorage.clear();
        localStorage.setItem("basictoken", res.data.token);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
        loginWithCustom();
        dispatch(loadUser());
      })
      .catch((err) => {
        dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
      });
  };

  return (
    <form className="forms">
      <FormInput
        id="loginEmail"
        type="text"
        isRequired={false}
        labelText="Email Address"
        name="email"
        value={loginObj?.email || ""}
        warnText="Email Address is required"
        onChange={onChange}
      />

      <FormInput
        id="loginPassword"
        type={showPassword ? "text" : "password"}
        labelText="Password"
        isRequired={false}
        name="password"
        value={loginObj?.password || ""}
        warnText="Password is required"
        onChange={onChange}
        icon={
          <div
            className="icon-wrap icon-l form-icon right mt-three-s"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeIcon /> : <EyeHiddenIcon />}
          </div>
        }
      />

      <div className="wd-100 d-flex justify-content-end mb-one-s">
        <div className="font-s pointer" style={{ color: "#0073e6" }}>
          <span
            onClick={() => {
              setForgotPassword(true);
            }}
          >
            Forgot Password?
          </span>
        </div>
      </div>

      <div className="wd-100 mt-one-s">
        <div className="btn btn-large btn-primary block-btn" onClick={onSubmit}>
          Sign In
        </div>
      </div>
    </form>
  );
};

export default BasicLogin;
