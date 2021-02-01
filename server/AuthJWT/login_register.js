const router = require("express").Router();
const Users_Model = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const user__auth = require("./JwtAuth");
const admin__auth=require('./AdminJwtAuth')

router.get("/", async (req, res) => {
  try {
    const fetch_all_users = await Users_Model.find().populate({
      path: "users",
    });
    res.status(200).json( fetch_all_users );
  } catch (error) {
    console.log({ error });
  }
});

router.post("/register", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    id,
    password: plainTextPassword,
    confirm_password,
    city,
    street,
  } = req.body;
  if (!email )
    return res.status(500).json({
      error: "Invalid email"
    });
    
    const password = await bcrypt.hash(plainTextPassword, 10);
    if (plainTextPassword!=confirm_password) return res.status(500).send({error:'Password dosnt match.'})
    try {
    const created_user = await Users_Model.create({
      first_name,
      last_name,
      email,
      id,
      password,
      city,
      street,
    });
    res.send({ "User registered succesfully": created_user });
  } catch (error) {
    if (error.code == 11000 )
      return res.status(418).json({
        status: "Error",
        error: "Email / ID alreaday in use.",
      });
    console.log({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users_Model.findOne({ email }).lean();

    if (!user)
      return res
        .status(500)
        .json({ status: "Erorr", error: "Invalid email/password" });
        console.log(user)

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(500)
        .json({ status: "Erorr", error: "Invalid email or password" });

    const access_token = jwt.sign(
      {
        user,
        id: user._id,
        email: user.email,
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "3h" }
    );
    return res.status(200).json({ status: "ok", access_token, user });
  } catch (error) {
    console.log({ error });
  }
});

module.exports = router;
