const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CartSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Cart", CartSchema);
