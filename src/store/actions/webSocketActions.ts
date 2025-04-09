// WebSocket action creators
export const connectWebSocket = (id?: string) => ({
  type: "ws/connect" as const,
  payload: id || "EMP0014",
});

export const disconnectWebSocket = () => ({
  type: "ws/disconnect" as const,
});

export const sendMessage = (message: string) => ({
  type: "ws/sendMessage" as const,
  payload: message,
});

export const stopBotResponse = () => ({
  type: "ws/stopBotResponse" as const,
});

// Define action types
export type WebSocketAction =
  | ReturnType<typeof connectWebSocket>
  | ReturnType<typeof disconnectWebSocket>
  | ReturnType<typeof sendMessage>
  | ReturnType<typeof stopBotResponse>;
