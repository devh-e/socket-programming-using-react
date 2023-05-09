const { Schema, model } = require("mongoose");

const user = new Schema({
  _id: String,
  status: Boolean,
  userId: String,
  socketId: String,
});

module.exports = model("User", user);
