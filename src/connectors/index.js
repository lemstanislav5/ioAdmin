import { Manager } from "socket.io-client";

export const socketСreator = (host, ws, port, token) => {
  console.log(token)
  let manager = new Manager(ws + "://" + host + ":" + port, { 
    transports: ['websocket', 'polling', 'flashsocket'],
    query: {token},
    autoConnect: true
  });
  return manager.socket("/");
}
