const express = require("express");
const router = express.Router();
const { admin, validate } = require("../models/admin");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
      const { email, password } = req.body;
      const admin1 = await admin.findOne({ email });

      if (!admin1) {
        return res.status(401).send({ message: "Invalid Email " });
      }
      
      const validPassword = await bcrypt.compare(password, admin1.password);
      if (!validPassword) {
        return res.status(401).send({ message: "Invalid  Password" });
      }
      const token = admin1.generateAuthToken();
      res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);


module.exports = router;
