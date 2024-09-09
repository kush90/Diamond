import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_URL } from './Helper'; // Make sure API_URL includes 'ws://'

const WebSocketContext = createContext();

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create socket.io connection with URL
    const newSocket = io(API_URL, {
      transports: ['websocket'], // Ensure WebSocket transport is used
      upgrade: false, // Disable HTTP polling upgrade
    });

    setSocket(newSocket);

    // Clean up socket.io connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};
