import React, { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
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

    const url = `${apiUrl}/school-dashboard/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    setEmail("");
    setPassword("");

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        onLoginSuccess(data.jwt_token);
      } else {
        onLoginFailure(data.message);
      }
    } catch (error) {
      console.log("Response Error: ", error.message);
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
