import { createSlice } from "@reduxjs/toolkit";

interface PersonaState {
  persona_id: string | undefined;
  available_personas: Array<{ id: string; name: string; avatar: string }>;
}

const personas = [
  { id: "EMP001", name: "Adarsh", avatar: "/icons/Employees.svg" },
  { id: "EMP002", name: "Ankan", avatar: "/icons/Employees.svg" },
  { id: "EMP003", name: "Harsh", avatar: "/icons/Employees.svg" },
  { id: "EMP004", name: "Bansal", avatar: "/icons/Employees.svg" },
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
