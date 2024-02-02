import { useState } from "react";
import FormInput from "../../components/forms/input";
import EyeIcon from "../../components/icons/eye";
import EyeHiddenIcon from "../../components/icons/eyeHidden";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/actions/toast";
import { resetPassword } from "../../redux/actions/auth";

const NewPassword = ({ email, resetPasswordToken }) => {
  const dispatch = useDispatch();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}|[\]\\:";'<>,.?/~`])[A-Za-z\d!@#$%^&*()_+={}|[\]\\:";'<>,.?/~`]{8,}$/;
  const [showPassword, setShowPassword] = useState(false);
  const [loginObj, setLoginObj] = useState({});

  const onChange = (e) => {
    setLoginObj({ ...loginObj, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
    if (!passwordRegex.test(loginObj?.newPassword)) {
      dispatch(
        setAlert(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.",
          "danger",
          3000
        )
      );
      return;
    }
    if (loginObj?.newPassword !== loginObj?.confirmPassword) {
      dispatch(setAlert("Should match with New Password", "danger", 3000));
      return;
    }
    dispatch(resetPassword({ resetPasswordToken, ...loginObj }));
  };

  return (
    <form className="forms">
      <FormInput
        id="loginEmail"
        type="text"
        disabled={true}
        isRequired={false}
        labelText="Email Address"
        name="email"
        value={email || ""}
        warnText="Email Address is required"
        onChange={onChange}
      />

      <FormInput
        id="loginNewPassword"
        type={showPassword ? "text" : "password"}
        labelText="New Password"
        isRequired={false}
        name="newPassword"
        value={loginObj?.newPassword || ""}
        warnText={
          !passwordRegex.test(loginObj?.newPassword)
            ? "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character."
            : undefined
        }
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

      <FormInput
        id="loginConfirmPassword"
        type={"password"}
        labelText="Confirm Password"
        isRequired={false}
        name="confirmPassword"
        value={loginObj?.confirmPassword || ""}
        warnText={
          loginObj?.confirmPassword !== loginObj?.newPassword
            ? "Should match with New Password"
            : undefined
        }
        onChange={onChange}
      />
      <div className="wd-100 mt-one-s">
        <div
          className={`${
            !loginObj?.newPassword || !loginObj?.confirmPassword
              ? "disabled"
              : ""
          } btn btn-large btn-primary block-btn`}
          onClick={onSubmit}
        >
          Reset Passsword
        </div>
      </div>
    </form>
  );
};

export default NewPassword;
