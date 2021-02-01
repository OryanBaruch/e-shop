const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    customerID:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    shoppingCartID:{
        type:Schema.Types.ObjectId,
        ref:'shoppingCart'
    },
    sum:Number,
    delivery:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    date:{type:Date, default:Date.now()},
    credit_card:Number
  },
  { versionKey: false }
);

const Order_Model = model("order", orderSchema);

module.exports = Order_Model;
