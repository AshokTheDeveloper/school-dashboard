import React, { useContext, useState } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import RowItem from "../RowItem/RowItem";
import { dashboardContext } from "../../context/dashboardContext";
import Header from "../Header/Header";
import "./TransactionStatus.css";

const TransactionStatus = () => {
  const { theme, apiUrl } = useContext(dashboardContext);
  const [searchInput, setSearchInput] = useState("");
  const [currentStatus, setCurrentStatus] = useState([]);

  const inputHandle = (event) => {
    setSearchInput(event.target.value);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return;
    }

    const url = `${apiUrl}/school-dashboard/check-status/${searchInput}`;
    setSearchInput("");

    try {
      const response = await axios.get(url);
      const data = await response.data;
      setCurrentStatus(data.transaction);
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  const darkTheme =
    theme === "dark" ? "dark-theme-details" : "light-theme-details";
  const themeText =
    theme === "dark" ? "light-text-details" : "dark-text-details";
  const themeHeader =
    theme === "dark" ? "dark-table-header" : "light-table-header";

  const renderNoResults = () => (
    <div className="status-search-results">
      <h2 className={`${themeText}`}>Search Results</h2>
    </div>
  );

  const renderStatusDetails = () => (
    <div className={`status-result-table-container ${darkTheme}`}>
      <div className={`dash-board-table-header ${themeHeader}`}>
        <p>Sr No</p>
        <p>Date</p>
        <p>Collect ID</p>
        <p>School ID</p>
        <p>Gateway</p>
        <p>Order Amt</p>
        <p>Transaction Amt</p>
        <p>Status</p>
        <p>Custom order ID</p>
      </div>
      <div className="dash-board-table-rows-container">
        {currentStatus.map((eachItem, index) => (
          <RowItem
            key={eachItem._id}
            rowDetails={{ ...eachItem, serialNumber: index + 1 }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className={`transaction-status-wrapper ${darkTheme}`}>
        <div className={`transaction-status-container ${darkTheme}`}>
          <h2>Check Transaction Status</h2>
          <form onSubmit={onSubmitForm} className="transaction-status-form">
            <input
              type="text"
              onChange={inputHandle}
              value={searchInput}
              placeholder="Search(Order ID)"
            />
            <button type="submit">
              <IoIosSearch className="status-check-search-icon" />
            </button>
          </form>
        </div>
        {currentStatus.length > 0 ? renderStatusDetails() : renderNoResults()}
      </div>
    </>
  );
};

export default TransactionStatus;
