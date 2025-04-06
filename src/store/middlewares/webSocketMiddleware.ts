import {
  addBotMessage,
  addUserMessage,
  setBotThinking,
  updateBotMessage,
  setBotTyping,
  setConnectionStatus,
  setError,
  stopBotResponse,
} from "../slices/chatSlice";
import { RootState } from "../index";
import { Middleware } from "redux";

// Define WebSocket message types
interface Action {
  type: string;
  payload: string;
}

interface Content {
  message: string;
}

interface WebSocketMessage {
  type: string;
  content: Content;
}

// WebSocket instance
let socket: WebSocket | null = null;

// WebSocket middleware - fixed type signature
export const websocketMiddleware: Middleware<unknown, RootState> =
  (store) => (next) => (action) => {
    const { dispatch } = store;

    // Type guard to ensure action is our expected Action type
    if (typeof action !== "object" || action === null) {
      return next(action);
    }

    const actionObj = action as Action;

    switch (actionObj.type) {
      // Connect to WebSocket
      case "ws/connect": {
        if (socket !== null) {
          socket.close();
        }

        // Update connection status
        dispatch(setConnectionStatus("connecting"));

        // Create new WebSocket connection
        socket = new WebSocket(`${import.meta.env.VITE_WS_URL}/ws/chat`);

        // Connection opened
        socket.onopen = () => {
          dispatch(setConnectionStatus("connected"));
          dispatch(setError(null)); // Clear any previous errors
          dispatch(setBotTyping(false)); // Reset bot typing state
          dispatch(setBotThinking(false)); // Reset bot thinking state
          console.log("WebSocket connected");
        };

        // Listen for messages
        socket.onmessage = (event) => {
          try {
            const data: WebSocketMessage = JSON.parse(event.data);
            switch (data.type) {
              case "thinking":
                dispatch(setBotThinking(true));
                break;
              case "start":
                dispatch(setBotTyping(true));
                dispatch(setBotThinking(false));
                dispatch(addBotMessage());
                break;
              case "data":
                dispatch(updateBotMessage(data.content.message));
                break;
              case "end":
                dispatch(setBotTyping(false));
                break;
              default:
                console.log("Unknown message type:", data);
            }
          } catch (error) {
            console.error("Error processing message:", error);
            dispatch(setError("Failed to process server message"));
          }
        };

        // Connection closed
        socket.onclose = () => {
          dispatch(setConnectionStatus("disconnected"));
          console.log("WebSocket disconnected");
        };

        // Connection error
        socket.onerror = (error) => {
          dispatch(setConnectionStatus("error"));
          dispatch(setError("WebSocket connection error"));
          console.error("WebSocket error:", error);
        };

        break;
      }

      // Disconnect WebSocket
      case "ws/disconnect": {
        if (socket !== null) {
          socket.close();
          socket = null;
        }
        dispatch(setConnectionStatus("disconnected"));
        break;
      }

      // Send message through WebSocket
      case "ws/sendMessage": {
        console.log("Sending message:", actionObj.payload);
        dispatch(addUserMessage(actionObj.payload));
        if (socket && socket.readyState === WebSocket.OPEN) {
          console.log("Sending message:", actionObj.payload);

          socket.send(
            JSON.stringify({
              type: "user_message",
              content: actionObj.payload,
              context: store.getState().chat.messages || [],
            })
          );
        } else {
          dispatch(setError("WebSocket is not connected"));
        }
        break;
      }
      case "ws/stopBotResponse": {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              type: "stop",
            })
          );

          dispatch(stopBotResponse());
        }
        break;
      }
    }

    return next(action);
  };
