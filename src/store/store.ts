import { websocketMiddleware } from "./middlewares/webSocketMiddleware";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import personaReducer from "./slices/personaSlice";
import chatReducer from "./slices/chatSlice";
import authReducer from "./authSlice";

export const store: EnhancedStore = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    persona: personaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});

// Infer types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
