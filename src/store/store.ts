import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatReducer from "./slices/chatSlice";
import suggestionsReducer from "./slices/suggestionsSlice";
import { websocketMiddleware } from "./middlewares/webSocketMiddleware";

export const store: EnhancedStore = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    suggestions: suggestionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});

// Infer types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
