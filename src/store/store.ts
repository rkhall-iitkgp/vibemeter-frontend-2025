import {
  configureStore,
  EnhancedStore,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import { websocketMiddleware } from "./middlewares/webSocketMiddleware";
import highRiskEmployeeReducer from "./slices/highRiskSlice";
import suggestionsReducer from "./slices/suggestionsSlice";
import personaReducer from "./slices/personaSlice";
import chatReducer from "./slices/chatSlice";
import authReducer from "./authSlice";

export const store: EnhancedStore = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    persona: personaReducer,
    suggestions: suggestionsReducer,
    highRiskEmployees: highRiskEmployeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});

// Infer types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;
