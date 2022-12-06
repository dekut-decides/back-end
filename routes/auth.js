const express = require("express");
const router = express.Router();
const { user } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { error } = validate(req.body);
      const { email, password } = req.body;
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }

      const foundUser = await user.findOne({ email });

      if (!foundUser) {
        return res.status(401).send({ message: "Invalid Email or Password" });
      }

      const validPassword = await bcrypt.compare(password, foundUser.password);

      if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });
      // res.send({ yourPassword: password, adminPassword: foundUser.password });
      const token = foundUser.generateAuthToken();
      res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
