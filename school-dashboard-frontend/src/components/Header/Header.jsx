import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { dashboardContext } from "../../context/dashboardContext";
import "./Header.css";

const Header = () => {
  const { theme, toggleTheme } = useContext(dashboardContext);

  const toggleThemeHandle = () => {
    toggleTheme();
  };

  const darkTheme = theme === "dark" ? "dark-theme-header" : "light-theme-header";
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
