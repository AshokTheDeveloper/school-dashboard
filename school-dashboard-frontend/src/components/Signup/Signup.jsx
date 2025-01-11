import React, { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { dashboardContext } from "../../context/dashboardContext";
import "./Signup.css";

const Signup = () => {
  const { apiUrl } = useContext(dashboardContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = () => {
    navigate("/login");
  };

  const onSubmitFailure = (msg) => {
    setErrorMsg(msg);
    setShowError(true);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      onSubmitFailure("Required all the fields");
      return;
    }

    const url = `${apiUrl}/school-dashboard/signup`;
    const user = {
      username,
      email,
      password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        console.log("Data: ", data);
        onSubmitSuccess();
      } else {
        onSubmitFailure();
      }
    } catch (error) {
      console.log("Response error: ", error);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="sign-up-bg-container">
      <h2>Dashboard Signup</h2>
      <form onSubmit={onSubmitForm} className="sign-up-form">
        <input type="text" placeholder="username" onChange={handleUsername} />
        <input type="email" placeholder="email" onChange={handleEmail} />
        <input
          type="password"
          placeholder="password"
          onChange={handlePassword}
        />
        {showError && <p className="signup-error-msg">*{errorMsg}</p>}
        <button type="submit">Signup</button>
        <div className="signup-nav-container">
          <span>Already have account?</span>
          <Link to="/login" className="signup-nav-links">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
