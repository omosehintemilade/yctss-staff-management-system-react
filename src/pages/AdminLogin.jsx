import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Logo } from "../components";

export default () => {
  const [state, setState] = useState({});
  const navigate = useNavigate();
  return (
    <section className="_section">
      <Logo />
      <h4 className="_section__text">Log In</h4>
      <label htmlFor="email">Email Address</label>
      <input type="text" name="emailOrId" placeholder="Email Address" />
      <small className="emailOrId_error">Email Address is required</small>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" placeholder="********" />
      <small className="password_error">Password is required</small>

      <Button
        text={"Log In"}
        onClick={() => {
          navigate("/admin/dashboard");
        }}
      />
    </section>
  );
};
