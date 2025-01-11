import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import TransactionDetails from "./components/TransactionDetails/TransactionDetails";
import TransactionStatus from "./components/TransactionStatus/TransactionStatus";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/transaction-details"
          element={
            <ProtectedRoute>
              <TransactionDetails />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/transaction-status"
          element={
            <ProtectedRoute>
              <TransactionStatus />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
