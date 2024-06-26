const socket = require('socket.io');
let io;
function initSocket(server) {
  io = socket(server, {
    cors: {
      origin: "http://13.239.169.209:3000",
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