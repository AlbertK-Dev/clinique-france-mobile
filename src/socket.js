import React, { createContext, useContext } from "react";
import io from "socket.io-client";
import * as uri from "./constants/urls";

// Define your server URL here
const serverUrl = uri.BASE_URL;

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const socket = io(serverUrl, {
    secure: true,
    reconnect: true,
    rejectUnauthorized: false,
  });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
