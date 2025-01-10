const CollectRequest = require("../models/collectRequest");

const webHook = async (req, res) => {
  const { status, order_info } = req.body;

  try {
    const {
      order_id,
      order_amount,
      transaction_amount,
      gateway,
      bank_reference,
    } = order_info;

    const updatedTransaction = await CollectRequest.findOneAndUpdate(
      { collect_id: order_id },
      { status, order_amount, transaction_amount, gateway, bank_reference },
      { new: true }
    );

    if (updatedTransaction) {
      res.status(200).json({
        message: "Transaction updated successfully",
        data: updatedTransaction,
      });
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = webHook;
