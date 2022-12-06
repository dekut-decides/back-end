const express = require("express");
const router = express.Router();

const { getAllVoters, addVoter,deleteVoter } = require("../controllers");

router.route("/").get(getAllVoters).post(addVoter).delete(deleteVoter);

module.exports = router;
 