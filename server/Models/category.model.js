const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: String,
  },
  { versionKey: false }
);

const Category_Model = model('category', categorySchema);

module.exports = Category_Model

