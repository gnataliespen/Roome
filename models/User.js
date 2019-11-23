const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "root"],
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("User", UserSchema);
