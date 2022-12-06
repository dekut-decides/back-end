const asyncHandler = require("express-async-handler");
const Voter = require("./models/voter");

const getAllVoters = asyncHandler(async (req, res) => {
  let {page,limit} = req.query;
  if(!page) page = 1;
  if(!limit) limit = 4;
  const skip = (page-1) * 4;
  const voters = await Voter.find().skip(skip).limit(limit);
  res.status(200).json(voters);
});
const addVoter = asyncHandler(async (req, res) => {
  if (!req.body.reg || !req.body.address) {
    res.status(400);
  }
  const voter = await Voter.create({
    reg: req.body.reg,
    address: req.body.address,
  });
  res.status(200).json(voter);
});
const deleteVoter = asyncHandler(async (req, res) => {
   const {voterID}= req.query;
    Voter.findByIdAndDelete(voterID)
    .then((voter) => res.send(voter))
    .catch((error) => console.log(error));

});
module.exports = {
  getAllVoters,
  addVoter,
  deleteVoter,
};


