const CollectRequest = require("../models/collectRequest");

const setCollectRequests = async (req, res) => {
  try {
    const {
      _id,
      school_id,
      trustee_id,
      gateway,
      order_amount,
      custom_order_id,
    } = req.body;

    const result = await CollectRequest.create({
      _id,
      school_id,
      trustee_id,
      gateway,
      order_amount,
      custom_order_id,
    });

    console.log("Result: ", result);
  } catch (error) {
    console.log("Internal server error", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = setCollectRequests;
