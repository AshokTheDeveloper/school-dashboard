import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import TransactionDetails from "./components/TransactionDetails/TransactionDetails";
import TransactionStatus from "./components/TransactionStatus/TransactionStatus";
import Header from "./components/Header/Header";
import "./App.css";
import { useContext, useEffect } from "react";
import { dashboardContext } from "./context/dashboardContext";

function App() {
  const { theme } = useContext(dashboardContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route
          exact
          path="/transaction-details"
          element={<TransactionDetails />}
        />
        <Route
          exact
          path="/transaction-status"
          element={<TransactionStatus />}
        />
      </Routes>
    </>
  );
}

export default App;
