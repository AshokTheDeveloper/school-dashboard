const mongoose = require("mongoose");

const CollectRequestStatusSchema = new mongoose.Schema({
  collect_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "collect_request",
  },
  status: {
    type: String,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  gateway: {
    type: String,
    required: true,
  },
  transaction_amount: {
    type: Number,
    required: true,
  },
  bank_refrence: {
    type: String,
    required: true,
  },
});

const collectStatusRequest = mongoose.model(
  "collect_request_status",
  CollectRequestStatusSchema
);
module.exports = collectStatusRequest;
