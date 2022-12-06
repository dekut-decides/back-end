const express = require("express");
const router = express.Router();
const { user, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email, password, regNumber } = req.body;
    try {
      const { error } = validate(req.body);

      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const userExists = await user.findOne({ email: req.body.email });
      if (userExists) {
        return res
          .status(409)
          .send({ message: "user with given email already exists" });
      }

      const salt = await bcrypt.genSalt(10);

      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = await user.create({
        ...req.body,
        password: hashPassword,
      });
      
      if (newUser) {
        res.status(201).send({ message: "user created successfully" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  })
);

module.exports = router;
