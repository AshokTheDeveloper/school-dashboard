import React, { useContext, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { dashboardContext } from "../../context/dashboardContext";
import "./RowItem.css";

const RowItem = (props) => {
  const { theme } = useContext(dashboardContext);
  const [copiedId, setCopiedId] = useState(null);

  const { rowDetails } = props;
  const {
    collect_id,
    custom_order_id,
    gateway,
    order_amount,
    school_id,
    status,
    transaction_amount,
    _id,
    serialNumber,
    createdAt,
  } = rowDetails;

  const copyToClipboard = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const themeBg = theme === "dark" ? "dark-item" : "light-item";
  const themeText = theme === "dark" ? "light-item-text" : "dark-item-text";
  const themeCopiedText = theme === "dark" ? "dark-copied" : "light-copied";

  return (
    <>
      <div className={`row-item-container ${themeBg}`}>
        <p>{serialNumber}</p>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
        <p className="collect-id-copy">
          {collect_id}
          {copiedId === collect_id ? (
            <span className="copied-text">Copied!</span>
          ) : (
            <button
              onClick={() => copyToClipboard(collect_id)}
              className="copy-collect-id-button"
            >
              <MdOutlineContentCopy className="copy-icon" />
            </button>
          )}
        </p>
        <p className="collect-id-copy">
          {school_id}
          {copiedId === school_id ? (
            <span className="copied-text">Copied!</span>
          ) : (
            <button
              onClick={() => copyToClipboard(school_id)}
              className="copy-collect-id-button"
            >
              <MdOutlineContentCopy className="copy-icon" />
            </button>
          )}
        </p>
        <p>{gateway}</p>
        <p>{order_amount}</p>
        <p>{transaction_amount}</p>
        <p
          className={`${
            status === "SUCCESS"
              ? "status-success"
              : status === "PENDING"
              ? "status-pending"
              : "status-failed"
          }`}
        >
          {status}
        </p>
        <p>{custom_order_id}</p>
      </div>
      <div className={`row-item-container-mobile ${themeBg}`}>
        <p>
          <span className={`${themeText}`}>SL No: </span> {serialNumber}
        </p>
        <p>
          <span className={`${themeText}`}>Date:</span>
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="mobile-ids">
          <span className={`${themeText}`}>Collect ID: </span> {collect_id}
          {copiedId === collect_id ? (
            <span className="mobile-copied-text">Copied!</span>
          ) : (
            <button
              onClick={() => copyToClipboard(collect_id)}
              className="copy-mobile-id-button"
            >
              <MdOutlineContentCopy className="mobile-copy-icon" />
            </button>
          )}
        </p>
        <p className="mobile-ids">
          <span className={`${themeText}`}>School ID: </span> {school_id}
          {copiedId === school_id ? (
            <span className={`mobile-copied-text ${themeBg}`}>Copied!</span>
          ) : (
            <button
              onClick={() => copyToClipboard(school_id)}
              className="copy-mobile-id-button"
            >
              <MdOutlineContentCopy className="mobile-copy-icon" />
            </button>
          )}
        </p>
        <p>
          <span className={`${themeText}`}>Gateway: </span> {gateway}
        </p>
        <p>
          <span className={`${themeText}`}>Order Amt: </span> {order_amount}
        </p>
        <p>
          <span className={`${themeText}`}>Transaction Amt: </span>
          {transaction_amount}
        </p>
        <p
          className={`${
            status === "SUCCESS"
              ? "status-success"
              : status === "PENDING"
              ? "status-pending"
              : "status-failure"
          }`}
        >
          <span className={`${themeText}`}>Status: </span> {status}
        </p>
        <p>
          <span className={`${themeText}`}>Custom order ID: </span>
          {custom_order_id}
        </p>
      </div>
    </>
  );
};

export default RowItem;
