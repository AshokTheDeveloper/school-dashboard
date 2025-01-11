import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { dashboardContext } from "../../context/dashboardContext";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(dashboardContext);

  const toggleThemeHandle = () => {
    toggleTheme();
  };

  const onLogoutHandle = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  const darkTheme =
    theme === "dark" ? "dark-theme-header" : "light-theme-header";
  const themeText = theme === "dark" ? "light-text" : "dark-text";
  const themeButton = theme === 'dark' ? 'light-button': 'dark-button'

  return (
    <header className={`header-container ${darkTheme}`}>
      <nav className="header-navbar-container">
        <Link to="/" className={`header-links ${themeText}`}>
          Dashboard
        </Link>
        <div className="header-links-container">
          {theme === "dark" ? (
            <button
              onClick={toggleThemeHandle}
              className={`theme-button ${themeButton}`}
            >
              <IoIosSunny className="theme-icon-light" />
            </button>
          ) : (
            <button
              onClick={toggleThemeHandle}
              className={`theme-button ${themeButton}`}
            >
              <IoIosMoon className="theme-icon-dark" />
            </button>
          )}
          <Link
            to="/transaction-details"
            className={`header-links ${themeText}`}
          >
            School
          </Link>
          <Link
            to="/transaction-status"
            className={`header-links ${themeText}`}
          >
            CheckStatus
          </Link>
          <button
            onClick={onLogoutHandle}
            className={`header-links logout-button ${themeText}`}
          >
            <MdLogout className="logout-icon" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
