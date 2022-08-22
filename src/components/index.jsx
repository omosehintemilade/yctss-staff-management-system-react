import { useContext } from "react";
import logo from "../assets/logo.png";
import { Context } from "../context";
import User from "../assets/user.jpg";
import { showToast, status } from "../utils";
import { UNPOPULATE_USER } from "../context/type";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Logo = ({ style }) => (
  <img className="_section__logo" src={logo} style={style} />
);

export const Button = ({ onClick, text, className }) => (
  <button className={`_button ${className}`} onClick={onClick}>
    {text}
  </button>
);

export const ProfileSnippet = () => {
  const {
    state: { user },
    dispatch
  } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className="profile_image-section border">
      <img
        className="profile_img"
        src={user.profile_pics ? `${API_BASE_URL}${user.profile_pics}` : User}
      />

      <p className="snippet">
        StaffID: <span>{user.staffId}</span>
      </p>
      <p className="snippet">
        Status: <span>{status(user.status)}</span>
      </p>
      <p className="snippet">
        Year Employed: <span>{new Date().getFullYear()}</span>
      </p>
      <p className="snippet">
        Department: <span>{user.department || "--"}</span>
      </p>
      <p className="snippet">
        Subject: <span>{user.subject || "--"}</span>
      </p>

      <Button
        text={"Log out"}
        className="logout_btn"
        onClick={() => {
          dispatch({ type: UNPOPULATE_USER });
          localStorage.removeItem("token");
          navigate("/user/login");
          showToast({ message: "Account logged out successfully" });
        }}
      />
    </div>
  );
};
