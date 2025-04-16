let io;

function socketSetup(server) {
  const socketIO = require('socket.io')(server, {
    cors: { origin: "*" }
  });

  io = socketIO;

  io.on('connection', (socket) => {
    console.log('✅ Socket connected: ' + socket.id);
    socket.emit('new-patient', {
      name: "John Doe",
      condition: "Fracture",
      priority: "High"
    });
  });
}

module.exports = socketSetup;
module.exports.io = {
  emit: (...args) => {
    if (io) {
      io.emit(...args);
    } else {
      console.warn("⚠️ io not initialized yet.");
    }
  }
};
