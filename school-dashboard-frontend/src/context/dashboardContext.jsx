import { createContext, useState, useEffect } from "react";

export const dashboardContext = createContext();

export const ContextProvider = (props) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const apiUrl = "http://localhost:3009";

  const value = {
    toggleTheme,
    theme,
    apiUrl,
  };

  return (
    <dashboardContext.Provider value={value}>
      {props.children}
    </dashboardContext.Provider>
  );
};
