const { Schema, model } = require("mongoose");

const msg = new Schema({
  roomNumber: String,
  msg: String,
  toUserId: String,
  fromUserId: String,
  time: String,
});

const room = new Schema({
  _id: String,
});

module.exports = {
  PrivateMsg: model("Private-msg", msg),
  PrivateRoom: model("Private-room", room),
};
