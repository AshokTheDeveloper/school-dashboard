import React, { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import { dashboardContext } from "../../context/dashboardContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { apiUrl } = useContext(dashboardContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const onLoginSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken);
    navigate("/");
  };

  const onLoginFailure = (msg) => {
    setErrorMsg(msg);
    setShowError(true);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      onLoginFailure("Required all the fields");
      return;
    }

    const user = {
      email,
      password,
    };

    setEmail("");
    setPassword("");
    const url = `${apiUrl}/school-dashboard/login`;
    try {
      const response = await axios.post(url, user, {
        "Content-Type": "application/json",
      });

      const data = await response.data;
      onLoginSuccess(data.jwt_token);
    } catch (error) {
      if (error.response) {
        onLoginFailure(response.data.message);
      } else if (error.request) {
        console.log("No Response: ", error.request);
        onSubmitFailure("No response from server");
      } else {
        console.log("Error: ", error.message);
        onSubmitFailure("An error occurred");
      }
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-bg-container">
      <h2>Dashboard Login</h2>
      <form onSubmit={onSubmitForm} className="login-form">
        <input type="email" placeholder="email" onChange={handleEmail} />
        <input
          type="password"
          placeholder="password"
          onChange={handlePassword}
        />
        {showError && <p className="login-error-msg">*{errorMsg}</p>}
        <button type="submit">Signup</button>
        <div className="login-nav-container">
          <span>Don't have account?</span>
          <Link to="/signup" className="login-nav-links">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
