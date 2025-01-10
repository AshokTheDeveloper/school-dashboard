const CollectRequestStatus = require("../models/requestStatus");
const getTransactionDetails = async (req, res) => {
  try {
    const { schoolId } = req.params;
    if (!schoolId) {
      return res.status(400).json({ message: "Please provide order id" });
    }

    const transaction = await CollectRequestStatus.aggregate([
      {
        $lookup: {
          from: "collect_requests",
          localField: "collect_id",
          foreignField: "_id",
          as: "status_data",
        },
      },
      {
        $unwind: "$status_data",
      },
      {
        $match: {
          "status_data.school_id": schoolId,
        },
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

    return res.status(200).json({ transaction });
  } catch (error) {
    console.log("Internal server error: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getTransactionDetails;
