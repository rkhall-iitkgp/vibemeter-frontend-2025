import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

interface ChatState {
  messages: Message[];
  isBotTyping: boolean;
  isBotThinking: boolean;
  lastbotMessageId?: string;
  error: string | null;
  connectionStatus: ConnectionStatus;
}

const initialState: ChatState = {
  messages: [],
  isBotTyping: false,
  isBotThinking: false,
  lastbotMessageId: undefined,
  error: null,
  connectionStatus: "disconnected",
};

const generateId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: generateId(),
        content: action.payload,
        role: "user",
        timestamp: Date.now(),
      });
    },

    addBotMessage: (state) => {
      const id = generateId();
      state.lastbotMessageId = id;
      state.messages.push({
        id: id,
        content: "",
        role: "assistant",
        timestamp: Date.now(),
      });
    },

    stopBotResponse: (state) => {
      state.isBotTyping = false;
      state.isBotThinking = false;
      state.lastbotMessageId = undefined;
    },

    updateBotMessage: (state, action: PayloadAction<string>) => {
      const message = state.messages.find(
        (msg) => msg.id === state.lastbotMessageId
      );
      if (message) {
        message.content += action.payload;
      }
    },

    setBotTyping: (state, action: PayloadAction<boolean>) => {
      state.isBotTyping = action.payload;
    },

    setBotThinking: (state, action: PayloadAction<boolean>) => {
      state.isBotThinking = action.payload;
    },

    setConnectionStatus: (state, action: PayloadAction<ConnectionStatus>) => {
      state.connectionStatus = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearChat: (state) => {
      state.messages = [];
      state.isBotTyping = false;
      state.isBotThinking = false;
      state.lastbotMessageId = undefined;
    },
  },
});

export const {
  addUserMessage,
  addBotMessage,
  updateBotMessage,
  setBotTyping,
  setBotThinking,
  setConnectionStatus,
  setError,
  clearChat,
  stopBotResponse,
} = chatSlice.actions;

export default chatSlice.reducer;
