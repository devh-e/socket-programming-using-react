const { Schema, model } = require("mongoose");

// 1
const groupUserList = new Schema({
  status: Boolean,
  userId: String,
  socketId: String,
});

// 2
const groupRoom = new Schema({
  loginUserId: String,
  status: Boolean,
  userId: String,
  socketId: String,
  type: String,
});

const msg = new Schema({
  roomNumber: String,
  msg: String,
  toUserId: String,
  fromUserId: String,
  time: String,
});

module.exports = {
  GroupUserList: model("Group-user", groupUserList),
  GroupRoom: model("Group-room", groupRoom),
  GroupMsg: model("Group-msg", msg),
};
