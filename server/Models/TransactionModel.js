const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Buyer or Seller email address is required"],
      },

      type: {
        type: String,
        required: [true, "Business type is required"],
      },

      product: {
        type: String,
        required: [true, "Product name is required"],
      },

      amount: {
        type: Number,
        required: [true, "Transaction Amount is required"],
      },

      dueDate: {
        type: Date,
      },

      paymentStatus: {
        type: String,
        required: [true, "Payment status is required"],
      },

      buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },

      buyerName: {
        type: String,
      },

      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },

      sellerName: {
        type: String,
      },


      createdAt: {
        type: Date,
        default: new Date(),
      },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;