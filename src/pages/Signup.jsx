import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Logo } from "../components";
import "../styles/signup.css";
import { showToast } from "../utils";
import { createUser } from "../utils/services";

export default () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    values[target.name] = target.value;
    setValues(values);
    const err = document.querySelector(`.${target.name}_error`);
    err.style.display = "none";
  };

  return (
    <section className="_section">
      <Logo />
      <h4 className="_section__text">Sign Up</h4>
      <form
        className="signup_form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          onChange={(e) => handleChange(e)}
        />
        <small className="email_error">Email is required</small>
        <label htmlFor="phonenumber">Phone Number</label>
        <input
          type="tel"
          name="phonenumber"
          placeholder="0812 345 6789"
          maxLength={14}
          onChange={(e) => handleChange(e)}
        />
        <small className="phonenumber_error">Phone number is required</small>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          onChange={(e) => handleChange(e)}
        />
        <small className="password_error">Password is required</small>
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          placeholder="********"
          onChange={(e) => handleChange(e)}
        />
        <small className="confirmpassword_error">Password does not match</small>
      </form>
      <div className="_section__btn-wrapper">
        <Button
          text={loading ? "Loading..." : "Sign Up"}
          onClick={async () => {
            for (const [key, value] of Object.entries(values)) {
              if (!values[key]) {
                const err = document.querySelector(`.${key}_error`);
                err.style.display = "block";
                document.querySelector(`input[name="${key}"]`).focus();
                return;
              }
            }

            if (values.password !== values.confirmpassword) {
              const err = document.querySelector(".confirmpassword_error");
              err.style.display = "block";
              const input = document.querySelector(
                "input[name='confirmpassword']"
              );
              input.focus();
              return;
            }

            try {
              setLoading(true);
              const res = await createUser(values);
              setLoading(false);
              showToast(res);
              localStorage.setItem("token", res.user.uuid);
              navigate("/user/login");
            } catch (error) {
              setLoading(false);
              showToast(error);
            }
          }}
        />
      </div>
    </section>
  );
};
