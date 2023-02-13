import { io, Socket } from 'socket.io-client';

class SocketioService {
  socket: Socket | null;

  constructor() {
    this.socket = null;
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT || '');
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
