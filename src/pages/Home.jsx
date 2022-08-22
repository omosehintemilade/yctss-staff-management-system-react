import { Button, Logo } from "../components";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  return (
    <section className="_section">
      <Logo />
      <h4 className="_section__text">
        Welcome To YCTSS Staff Record <br />
        Management System
      </h4>

      <div className="_section__btn-wrapper">
        <Button text={"Log In"} onClick={() => navigate("/login")} />
        <Button text={"Sign Up"} onClick={() => navigate("/register")} />
      </div>
    </section>
  );
};
