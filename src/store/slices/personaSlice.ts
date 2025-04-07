import { createSlice } from "@reduxjs/toolkit";

interface PersonaState {
  persona_id: string | undefined;
  available_personas: Array<{ id: string; name: string; avatar: string }>;
}

const personas = [
  { id: "EMP001", name: "Joey", avatar: "/avatars/Joey.png" },
  { id: "EMP002", name: "Ross", avatar: "/avatars/Monica.png" },
  { id: "EMP003", name: "Rachel", avatar: "/avatars/Rachel.png" },
  { id: "EMP004", name: "Monica", avatar: "/avatars/Ross.png" },
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
