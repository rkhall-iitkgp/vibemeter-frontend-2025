import { createSlice } from "@reduxjs/toolkit";

interface PersonaState {
  persona_id: string | undefined;
  available_personas: Array<{ id: string; name: string; avatar: string }>;
}

const personas = [
  { id: "EMP001", name: "Joey", description: "Underperforming", avatar: "/avatars/Joey.png" },
  { id: "EMP002", name: "Ross", description: "Unrecognized efforts", avatar: "/avatars/Monica.png" },
  { id: "EMP003", name: "Rachel", description: "Dissatisfied", avatar: "/avatars/Rachel.png" },
  { id: "EMP004", name: "Monica", description: "Burned out", avatar: "/avatars/Ross.png" },
];

const initialState: PersonaState = {
  persona_id: undefined,
  available_personas: personas,
};

const personaSlice = createSlice({
  name: "persona",
  initialState,
  reducers: {
    setPersona: (state, action) => {
      state.persona_id = action.payload;
    },
  },
});

export const { setPersona } = personaSlice.actions;
export default personaSlice.reducer;
