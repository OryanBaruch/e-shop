const router = require("express").Router();
const Product_Model = require("../Models/product.model");

router.get("/", async (req, res) => {
  try {
    const fetchProducts = await Product_Model.find().populate({
      path: "category",
    });
    res.status(200).json({ fetchProducts });
  } catch (error) {
    console.log({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fetchProductsByID = await Product_Model.find({ _id: id }).populate({
      path: "category",
    });
    res.status(200).json({ fetchProductsByID });
  } catch (error) {
    console.log({ error });
  }
});

router.get("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fetch_all_products_by_category = await Product_Model.find({
      category: id,
    }).populate({
      path: "category",
    });
    res.status(200).json({ fetch_all_products_by_category });
  } catch (error) {
    console.log({ error });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name, category, price, photo_url } = req.body;
    if (!req.body) return res.status(403).json("Must fill all fileds");
    const addedProduct = new Product_Model({
      name,
      category,
      price,
      photo_url,
    });
    await addedProduct.save();
    res.status(200).json({ addedProduct });
  } catch (error) {
    console.log({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const filtered_products = Product_Model.deleteOne({ _id: id }).populate({
      path: "category",
    });
    res.status(200).json({ filtered_products });
  } catch (error) {
    console.log({ error });
  }
});

module.exports = router;
