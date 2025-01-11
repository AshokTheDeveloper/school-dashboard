import React, { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
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

    try {
      const response = await axios.post(url, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.data;
      onSubmitSuccess();
    } catch (error) {
      if (error.response) {
        onSubmitFailure(error.response.data.message || "An error occurred");
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
