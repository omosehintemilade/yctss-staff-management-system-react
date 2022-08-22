import { useNavigate } from "react-router-dom";
import { Button, Logo } from "../components";

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
        <Button
          text={"Log In as Admin"}
          onClick={() => navigate("/admin/login")}
        />
        <Button
          text={"Log In as User"}
          onClick={() => navigate("/user/login")}
        />
      </div>
    </section>
  );
};
