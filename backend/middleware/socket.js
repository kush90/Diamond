const socket = require('socket.io');
let io;
function initSocket(server) {
  io = socket(server, {
    cors: {
      origin: "https://diamond-05pp.onrender.com",
      methods: ["GET", "POST"]
    }
  })
  io.on('connection', function (socket) {
    console.log(`${socket.id} is connected`);
  });


};
function emitNewNoti(data) {
  if (io) {
    io.emit('new-noti', data);
  } else {
    console.error('Socket.io has not been initialized');
  }
}
module.exports = {
  initSocket,
  emitNewNoti,
};