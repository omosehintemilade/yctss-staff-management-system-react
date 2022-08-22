import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axios";
import { Context } from "../context";
import { getUserProfileData } from "../utils/services";
import { POPULATE_USER } from "../context/type";
import { showToast } from "../utils";
const setAuthToken = (navigate) => {
  const token = localStorage.getItem("token");

  if (!token) {
    delete axiosInstance.defaults.headers.common["token"];
    navigate("/login", {
      replace: true
    });
  } else {
    axiosInstance.defaults.headers.common["token"] = token;
  }
};

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const rendered = useRef(false);

  const isObjEmpty = (object) => {
    return Object.keys(object).length === 0;
  };

  const {
    state: { user },
    dispatch
  } = useContext(Context);

  // Confirm that user account is not inactive
  if (user.status == 0 || user.status == 2) {
    showToast({
      message:
        "This account has been suspended. Kindly contact your admin to reactivate your account"
    });
    navigate("/login");
  }

  async function Authenticate() {
    setAuthToken(navigate);

    const userIsEmpty = gitisObjEmpty(user);

    if (userIsEmpty) {
      try {
        setLoading(true);
        const response = await getUserProfileData();
        dispatch({ type: POPULATE_USER, payload: response.user });
        setAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setAuthenticated(false);
        setLoading(false);
      }
    }
    setAuthenticated(true);
    setLoading(false);
  }

  const redirectToLogin = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    // If component have been rendered previously
    if (rendered.current == false) {
      rendered.current = true;
      (async () => await Authenticate())();
    }
  }, []);

  return (
    <div className="">
      {loading === false &&
        (authenticated === true ? children : redirectToLogin())}
    </div>
  );
};
export default ProtectedRoute;
