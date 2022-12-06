const express = require("express");
const app = express();

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const adminRoute = require("./routes/adminAuth");
const voterRoute = require("./routes/voter");
const dotenv = require("dotenv").config();

// require("dotenv").config();
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 8000;
const connectDB = require("./dbConfig");
connectDB();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //configure frontend port here
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/VoterSignUp", userRoutes);
app.use("/VoterLogin", authRoutes);
app.use("/AdminLogin", adminRoute);
app.use("/RegisterVoter", voterRoute);

app.listen(port, () => console.log(`server is listening on port${port}`));

