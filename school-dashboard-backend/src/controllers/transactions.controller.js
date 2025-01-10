const CollectRequestStatus = require("../models/requestStatus");

const fetchAllTransactions = async (req, res) => {
  try {
    const transactions = await CollectRequestStatus.aggregate([
      {
        $lookup: {
          from: "collect_requests", // name of the other collection
          localField: "collect_id",
          foreignField: "_id",
          as: "status_data",
        },
      },
      {
        $unwind: "$status_data", // Flatten the joined data
      },
      {
        $project: {
          collect_id: "$collect_id",
          school_id: "$status_data.school_id",
          gateway: "$gateway",
          order_amount: "$status_data.order_amount",
          transaction_amount: "$transaction_amount",
          status: "$status",
          custom_order_id: "$status_data.custom_order_id",
          createdAt: "$status_data.createdAt",
        },
      },
    ]);

    return res.status(200).json({ transactions: transactions });
  } catch (error) {
    console.log("Internal server error: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = fetchAllTransactions;
