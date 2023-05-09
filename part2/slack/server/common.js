// 1
const User = require("./schema/User");

const common = (io) => {
  // 2
  io.use(async (socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) {
      console.log("err");
      return next(new Error("invalid userId"));
    }
    socket.userId = userId;
    await findOrCreateUser(socket.userId, socket.id);
    next();
  });

  // 3
  io.on("connection", async (socket) => {
    io.sockets.emit("user-list", await User.find());

    socket.on("disconnect", async () => {
      await User.findOneAndUpdate(
        { _id: socket.userId },
        { status: false }
      );
      io.sockets.emit("user-list", await User.find());
      console.log("disconnect...");
    });
  });
};

// 4
async function findOrCreateUser(userId, socketId) {
  if (userId == null) return;

  const document = await User.findOneAndUpdate(
    { _id: userId },
    { status: true }
  );
  if (document) return document;
  return await User.create({
    _id: userId,
    status: true,
    userId: userId,
    socketId: socketId,
  });
}

module.exports.commoninit = common;
