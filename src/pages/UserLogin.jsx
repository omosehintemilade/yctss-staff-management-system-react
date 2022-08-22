import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Logo } from "../components";
import { loginFn } from "../utils/services";
import { showToast } from "../utils";
import { Context } from "../context";
import { POPULATE_USER } from "../context/type";

export default () => {
  const [values, setValues] = useState({
    emailOrId: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
  // {
  //   emailOrId: "johnsmith@example.com",
  //   password: "1234",
  // }

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    values[target.name] = target.value;
    setValues(values);
    const err = document.querySelector(`.${target.name}_error`);
    err.style.display = "none";
  };
  return (
    <section className="_section">
      <Logo />
      <h4 className="_section__text">Log In</h4>
      <label htmlFor="email">Email Address / Staff ID</label>
      <input
        type="text"
        name="emailOrId"
        placeholder="Email Address / Staff ID"
        onChange={(e) => handleChange(e)}
      />
      <small className="emailOrId_error">
        Email Address or Staff ID is required
      </small>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="********"
        onChange={(e) => handleChange(e)}
      />
      <small className="password_error">Password is required</small>

      <Button
        text={loading ? "Loading..." : "Log In"}
        onClick={async () => {
          for (const [key, value] of Object.entries(values)) {
            if (!values[key]) {
              const err = document.querySelector(`.${key}_error`);
              err.style.display = "block";
              document.querySelector(`input[name="${key}"]`).focus();
              return;
            }
          }

          try {
            setLoading(true);
            const res = await loginFn({
              id: values.emailOrId,
              email: values.emailOrId,
              password: values.password
            });
            setLoading(false);

            if (res.user.status == 0) {
              showToast({
                message:
                  "This account is yet to be activated. Kindly contact your admin to activate your account"
              });
            } else if (res.user.status == 2) {
              showToast({
                message:
                  "This account has been suspended. Kindly contact your admin to reactivate your account"
              });
            } else {
              showToast(res);
              localStorage.setItem("token", res.user.uuid);

              // Dspatch context
              dispatch({
                type: POPULATE_USER,
                payload: res.user
              });

              navigate("/user/profile");
            }
          } catch (error) {
            setLoading(false);
            showToast(error);
          }
        }}
      />
    </section>
  );
};
