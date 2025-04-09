import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import {
  connectWebSocket,
  disconnectWebSocket,
  sendMessage,
  stopBotResponse,
} from "@/store/actions/webSocketActions";
import { RootState } from "@/store";

export const useChat = () => {
  const id = useSelector((state: RootState) => state.persona.persona.id);
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState<string>("");

  const messages = useSelector((state: RootState) => state.chat.messages);
  const connectionStatus = useSelector(
    (state: RootState) => state.chat.connectionStatus
  );
  const isTyping = useSelector((state: RootState) => state.chat.isBotTyping);
  const isThinking = useSelector(
    (state: RootState) => state.chat.isBotThinking
  );
  const error = useSelector((state: RootState) => state.chat.error);

  // Connect to WebSocket when hook is first used
  useEffect(() => {
    dispatch(connectWebSocket(id));

    return () => {
      dispatch(disconnectWebSocket());
    };
  }, [dispatch]);

  const sendUserMessage = (message?: string) => {
    if (inputMessage.trim() || message?.trim()) {
      setInputMessage("");
      dispatch(sendMessage(message || inputMessage));
    }
  };

  const stopResponse = () => {
    dispatch(stopBotResponse());
  };

  const reconnect = () => {
    dispatch(connectWebSocket());
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    sendUserMessage,
    connectionStatus,
    reconnect,
    stopResponse,
    isTyping,
    isThinking,
    error,
  };
};
