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

  return (
    <header className={`header-container ${darkTheme}`}>
      <nav className="header-navbar-container">
        <Link to="/" className={`header-links ${themeText}`}>
          Dashboard
        </Link>
        <div className="header-links-container">
          {theme ? (
            <button
              onClick={toggleThemeHandle}
              className={`theme-button ${darkTheme}`}
            >
              <IoIosSunny className="theme-icons" />
            </button>
          ) : (
            <button
              onClick={toggleThemeHandle}
              className={`theme-button ${darkTheme}`}
            >
              <IoIosMoon className="theme-icons" />
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
            Status Check
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
