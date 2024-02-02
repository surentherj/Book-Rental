import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../../components/forms/input";
import DownSortIcon from "../../components/icons/downSortIcon";
import { sendResetPasswordMail } from "../../redux/actions/auth";

const ForgotPassword = ({ setForgotPassword }) => {
  const dispatch = useDispatch();
  const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [counter, setCounter] = useState(90);
  const [loginObj, setLoginObj] = useState({});

  const onChange = (e) => {
    setLoginObj({ ...loginObj, [e.target.name]: e.target.value });
  };
  return (
    <>
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

        <div className="wd-100 mt-one-s">
          <div
            className={`btn btn-large btn-primary-border block-btn  ${
              loginObj?.email?.match(validRegex) ? "" : "disabled"
            }`}
            onClick={() => {
              if (counter !== 90) {
                return;
              }
              var i = 90;
              var id = setInterval(() => {
                i--;
                setCounter(i);
                if (i === 0) {
                  setCounter(90);
                  clearInterval(id);
                }
              }, 1000);
              dispatch(sendResetPasswordMail(loginObj?.email));
            }}
          >
            {counter === 90 ? (
              "Send Reset Password Link"
            ) : (
              <>
                Not Received ? Resend In
                {counter < 10 && counter >= 0
                  ? " 00:0" + counter
                  : " 00:" + counter}
              </>
            )}
          </div>
        </div>
        <div className="wd-100 d-flex align-items-center justify-content-end mt-two-s">
          <div className="font-s pointer">
            <u
              onClick={() => {
                setForgotPassword(false);
              }}
            >
              <div className="icon-wrap icon-s transformIcon90">
                <DownSortIcon />
              </div>
              <span className="mr-two-s">Back</span>
            </u>
          </div>
        </div>
      </form>
    </>
  );
};
export default ForgotPassword;
