const socket = require('socket.io');
let io;

function initSocket(server) {
  io = socket(server, {
    cors: {
      origin: "https://diamond-05pp.onrender.com", // Allow requests from frontend
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
