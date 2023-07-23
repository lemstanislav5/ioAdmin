import { Manager } from "socket.io-client";
const token = localStorage.getItem("token");

export const socketСreator = (host, ws, port) => {
  let manager = new Manager(ws + "://" + host + ":" + port, { 
    transports: ['websocket', 'polling', 'flashsocket'],
    query: {token},
    // autoConnect: false
  });
  return manager.socket("/");
}
