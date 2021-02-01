const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: { type: String, required: true, unique: true },
    id: { type: Number, required: true, unique: true },
    password: String,
    city: String,
    street: String,
    Role: { type: Boolean, default: false },
  },
  { versionKey: false }
);

const Users_Model = model("users", userSchema);

module.exports = Users_Model;
