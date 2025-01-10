const mongoose = require("mongoose");

const CollectRequestSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  school_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  trustee_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  gateway: {
    type: String,
    required: true,
  },
  order_amount: {
    type: Number,
    required: true,
  },
  custom_order_id: {
    type: String,
    required: true,
  },
});

const collectRequest = mongoose.model("collect_request", CollectRequestSchema);
module.exports = collectRequest;
