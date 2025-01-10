const CollectStatusRequest = require("../models/requestStatus");

const setCollectRequestStatuses = async (req, res) => {
  try {
    const {
      collect_id,
      status,
      payment_method,
      gateway,
      transaction_amount,
      bank_refrence,
    } = req.body;

    const result = await CollectStatusRequest.create({
      collect_id,
      status,
      payment_method,
      gateway,
      transaction_amount,
      bank_refrence,
    });

    return res.status(200).json({ result: result });
  } catch (error) {
    console.log("Internal server error", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = setCollectRequestStatuses;
