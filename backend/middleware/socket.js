const socket = require('socket.io');
let io;

function initSocket(server) {
  io = socket(server, {
    cors: {
      origin: "http://3.27.65.59:3000", // Allow requests from frontend
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', function (socket) {
    console.log(`${socket.id} is connected`);
    socket.on('disconnect', () => {
      console.log(`${socket.id} has disconnected`);
    });
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
