import { useState, useEffect } from "react";

export const useSocket = (server = "ws://localhost:8080") => {
  const [socket, setSocket] = useState(null);
  const [socketOpen, setSocketOpen] = useState(false);

  useEffect(() => {
    setSocket(new WebSocket(server));
  }, [server]);

  useEffect(() => {
    if (socket) {
      socket.addEventListener("open", () => {
        setSocketOpen(true);
      });
    }
  }, [socket]);

  return {
    socket,
    socketOpen
  };
};
