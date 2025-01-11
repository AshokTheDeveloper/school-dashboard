const express = require("express");
const router = express.Router();

const fetchAllTransactions = require("../controllers/transactions.controller");
const setCollectRequests = require("../controllers/collectRequest.controller");
const setCollectRequestStatuses = require("../controllers/collectRequestStatus.controller");
const checkStatus = require("../controllers/checkStatus.controller");
const getTransactionDetails = require("../controllers/getTransactionDetails.controller");
const statusUpdate = require("../controllers/statusUpdate.controller");
const webHook = require("../controllers/webHookPayload.controller");
const userSignup = require("../controllers/signup.controller");
const userLogin = require("../controllers/login.controller");

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/transactions", fetchAllTransactions);
router.post("/add-transaction", setCollectRequests);
router.post("/add-status", setCollectRequestStatuses);
router.get("/check-status/:orderId", checkStatus);
router.get("/transaction-details/:schoolId", getTransactionDetails);
router.post("/status-update", statusUpdate);
router.post("/webhook", webHook);

module.exports = router;
