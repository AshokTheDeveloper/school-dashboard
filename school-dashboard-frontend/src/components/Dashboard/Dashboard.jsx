import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import RowItem from "../RowItem/RowItem";
import Pagination from "../Pagination/Pagination";
import { dashboardContext } from "../../context/dashboardContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { theme, apiUrl } = useContext(dashboardContext);
  const [transactionData, setTransactionData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredDocs, setFilteredDocs] = useState();
  const [currentStatus, setCurrentStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const rowsPerPage = 10;

  const themeBg = theme === "dark" ? "dark-theme" : "light-theme";
  const themeText = theme === "dark" ? "light-text" : "dark-text";
  const themeHeader =
    theme === "dark" ? "dark-table-header" : "light-table-header";

  useEffect(() => {
    initiateAllTransactionsApi();
  }, []);

  const searchedItems = () => {
    if (!searchInput) {
      return;
    }

    return transactionData.filter((eachItem) =>
      eachItem.custom_order_id.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const searchFilteredItems = searchedItems();

  const filteredTransactions =
    currentStatus === "All"
      ? transactionData
      : transactionData.filter(
          (eachItem) =>
            eachItem.status.toLowerCase() === currentStatus.toLowerCase()
        );

  const filteredItems =
    filteredDocs || searchFilteredItems || filteredTransactions;

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filterByDateRange = () => {
    if (!startDate || !endDate) {
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const localStart = start.toLocaleDateString();
    const localEnd = end.toLocaleDateString();

    const filtered = transactionData.filter((doc) => {
      const createdAt = new Date(doc.createdAt);
      const localDate = createdAt.toLocaleDateString();
      return localDate >= localStart && localDate <= localEnd;
    });
    setFilteredDocs(filtered);
  };

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const initiateAllTransactionsApi = async () => {
    const url = `${apiUrl}/school-dashboard/transactions`;
    const options = {
      method: "GET",
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      setTransactionData(data.transactions);
    }
  };

  const onStatusChangeHandler = (event) => {
    setCurrentStatus(event.target.value);
  };

  const renderDashboardTopSection = () => (
    <div className="dash-board-top-section-container">
      <div className="dash-board-input-search-and-dropdown-container">
        <div className="search-and-filter-container">
          <input
            onChange={onChangeSearchInput}
            type="text"
            placeholder="Search (Order ID...)"
          />
        </div>
        <div className="dash-bard-dropdowns-container">
          <div className="date-range-container">
            <input
              type="text"
              onChange={(e) => setStartDate(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) {
                  e.target.type = "text";
                  e.target.placeholder = "Start Date";
                }
              }}
              placeholder="Start date"
            />
            <input
              type="text"
              onChange={(e) => setEndDate(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) {
                  e.target.type = "text";
                  e.target.placeholder = "End date";
                }
              }}
              placeholder="End date"
            />
            <button onClick={filterByDateRange}>
              <IoSearch className="date-search-icon" />
            </button>
          </div>
          <select
            onChange={onStatusChangeHandler}
            className="status-dropdown"
            defaultValue="Status"
          >
            <option disabled className="placeholder">
              Status
            </option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failure">Failure</option>
          </select>
        </div>
      </div>
      <div className={`dash-board-rows-count-container ${themeText}`}>
        <p>Rows per page</p>
        <p className={`rows-count ${themeHeader}`}>{rowsPerPage}</p>
      </div>
    </div>
  );

  const renderDashboardTable = () => (
    <div className={`dash-board-table-container ${themeBg}`}>
      {currentItems.length > 0 && (
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
      )}
      <div className={`dash-board-table-rows-container ${themeBg}`}>
        {currentItems.map((eachItem, index) => (
          <RowItem
            key={eachItem._id}
            rowDetails={{
              ...eachItem,
              serialNumber: indexOfFirstItem + index + 1,
            }}
          />
        ))}
      </div>

      <Pagination
        paginationDetails={{ totalPages, currentPage }}
        paginate={paginate}
      />
    </div>
  );

  return (
    <div className={`dash-board-bg-wrapper ${themeBg}`}>
      {renderDashboardTopSection()} {renderDashboardTable()}
    </div>
  );
};

export default Dashboard;
