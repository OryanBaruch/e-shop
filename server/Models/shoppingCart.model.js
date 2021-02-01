const { Schema, model } = require("mongoose");

const shoppingCartSchema = new Schema(
  {
      userID:{
          type:Schema.Types.ObjectId,
          ref:'users',
      },
      date:{type:Date, defualt:Date.now()}
  },
  { versionKey: false }
);

const shoppingCart_Model = model("shoppingCart", shoppingCartSchema);

module.exports = shoppingCart_Model;
