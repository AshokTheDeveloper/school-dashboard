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
const authenticateUser = require("../middleware/authMiddleware");

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/transactions", authenticateUser, fetchAllTransactions);
router.post("/add-transaction", authenticateUser, setCollectRequests);
router.post("/add-status", authenticateUser, setCollectRequestStatuses);
router.get("/check-status/:orderId", authenticateUser, checkStatus);
router.get("/transaction-details/:schoolId",authenticateUser,getTransactionDetails);
router.post("/status-update", authenticateUser, statusUpdate);
router.post("/webhook", authenticateUser, webHook);

module.exports = router;
