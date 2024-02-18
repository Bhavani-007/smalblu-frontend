import { useEffect, useRef } from "react";

const WebSocketService = (url, onMessageCallback) => {
  const wsRef = useRef(null);

  useEffect(() => {
    // Create a new WebSocket connection when the component mounts
    wsRef.current = new WebSocket(url);

    const ws = wsRef.current;

    const handleOpen = () => {
      console.log('Connected to WebSocket server');
    };

    const handleMessage = (event) => {
      onMessageCallback(event.data);
    };

    const handleClose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Add event listeners
    ws.addEventListener('open', handleOpen);
    ws.addEventListener('message', handleMessage);
    ws.addEventListener('close', handleClose);

    // Cleanup: Close WebSocket connection when the component unmounts
    return () => {
      ws.removeEventListener('open', handleOpen);
      ws.removeEventListener('message', handleMessage);
      ws.removeEventListener('close', handleClose);

      if (ws.readyState !== WebSocket.CLOSED) {
        ws.close();
      }
    };
  }, [url, onMessageCallback]);

  return wsRef.current;
};

export default WebSocketService;
