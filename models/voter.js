const mongoose = require("mongoose");

const voterSchema = mongoose.Schema({
  reg: {
    type: String,
    required: [true, "please add aa valid reg number"],
    minlength: 10,
  },
  address: {
    type: String,
    required: [true, "please add a valid address"],
    minlength: 42,
  },

  isRegistered: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Voter", voterSchema);
