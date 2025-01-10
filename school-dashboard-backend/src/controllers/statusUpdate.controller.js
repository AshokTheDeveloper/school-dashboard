const CollectRequestStatus = require("../models/requestStatus");

const statusUpdate = async (req, res) => {
  const { collect_id, status } = req.body;

  try {
    const updatedTransaction = await CollectRequestStatus.findOneAndUpdate(
      { collect_id },
      { status },
      { new: true }
    );

    if (updatedTransaction) {
      res.status(200).json({ message: "Status updated successfully" });
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = statusUpdate;
