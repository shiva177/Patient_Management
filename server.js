const http = require('http');
const app = require('./app');
const { Server } = require("socket.io");
const socketSetup = require('./sockets/realTimeNotifier');

// Optional: enable simulation mode for auto-patient generation
require('./simulation/simulator');

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket (Socket.IO) on the same server
socketSetup(server);

// Use PORT from .env or fallback to 3000
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Optional: Gracefully handle errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});
