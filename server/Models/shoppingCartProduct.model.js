const { Schema, model } = require("mongoose");

const shoppingCartProductSchema = new Schema(
  {
      product:{
          type:Schema.Types.ObjectId,
          ref:'product'
      },
      amount:Number,
      price:{
          type:Schema.Types.ObjectId,
          ref:'product'
      },
      cartID:{
        type:Schema.Types.ObjectId,
        ref:'shoppingCart'
      }
  },
  { versionKey: false }
);

const shoppingCartProduct_Model = model("shoppingCartProduct", shoppingCartProductSchema);

module.exports = shoppingCartProduct_Model;
