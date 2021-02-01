const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    price: Number,
    photo_url: String,
  },
  { versionKey: false }
);

const Product_Model = model("product", productSchema);


module.exports = Product_Model
