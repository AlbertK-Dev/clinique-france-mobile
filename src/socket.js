import React, { createContext, useContext } from "react";
import io from "socket.io-client";
import * as uri from "./constants/urls";

// Define your server URL here
const serverUrl = "http://192.168.1.50:3500";

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  //   const socket = io(uri.BASE_URL);
  const socket = io(serverUrl);
  socket.emit("userId", "ksjkdjskdskdjksjdsuserId");
  socket.on("onRoad", (data) => {
    console.log(data);
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
