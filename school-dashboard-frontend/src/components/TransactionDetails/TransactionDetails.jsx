import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import RowItem from "../RowItem/RowItem";
import { dashboardContext } from "../../context/dashboardContext";
import Header from "../Header/Header";
import "./TransactionDetails.css";

const TransactionDetails = () => {
  const { theme, apiUrl } = useContext(dashboardContext);
  const [transactions, setTransactions] = useState([]);
  const [uniqueIds, setUniqueIds] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [transactionDetails, setTransactionDetails] = useState([]);

  const darkTheme =
    theme === "dark" ? "dark-theme-details" : "light-theme-details";
  const themeText =
    theme === "dark" ? "light-text-details" : "dark-text-details";
  const themeHeader =
    theme === "dark" ? "dark-table-header" : "light-table-header";

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    if (transactions) {
      const ids = transactions.map((item) => item.school_id);
      const unique = Array.from(new Set(ids));
      setUniqueIds(unique);
    }
  }, [transactions]);

  useEffect(() => {
    if (!currentId) {
      return;
    }
    getTransactionDetails();
  }, [currentId]);

  const onChangeSchoolId = (event) => {
    setCurrentId(event.target.value);
  };

  const getTransactions = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${apiUrl}/school-dashboard/transactions`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await response.data;
    setTransactions(data.transactions);
  };

  const getTransactionDetails = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${apiUrl}/school-dashboard/transaction-details/${currentId}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await response.data;
    setTransactionDetails(data.transaction);
  };

  const renderDropdown = () => (
    <select
      defaultValue="Select School ID"
      className="transaction-details-dropdown"
      onChange={onChangeSchoolId}
    >
      <option className="select-school-id-text" disabled>
        Select School ID
      </option>
      {uniqueIds.length > 0 &&
        uniqueIds.map((eachItem, index) => (
          <option value={eachItem} key={index}>
            {eachItem}
          </option>
        ))}
    </select>
  );

  const renderNoResults = () => (
    <div className="transaction-details-no-results-container">
      <h2 className={`${themeText}`}>Search Results</h2>
    </div>
  );

  const renderTransactionDetails = () => (
    <div className="transaction-details-table-container">
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
        {transactionDetails.map((eachItem, index) => (
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
      <div className={`transaction-details-wrapper ${darkTheme}`}>
        <h2 className={`${themeText}`}>TransactionDetails</h2>
        {renderDropdown()}
        {transactionDetails && transactionDetails.length > 0
          ? renderTransactionDetails()
          : renderNoResults()}
      </div>
    </>
  );
};

export default TransactionDetails;
