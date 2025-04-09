import { createSlice } from "@reduxjs/toolkit";

interface Persona {
  id: string;
  name: string;
  description: string;
  avatar: string;
}
interface PersonaState {
  persona: Persona | undefined;
  available_personas: Array<{ id: string; name: string; avatar: string }>;
}

const personas = [
  {
    id: "EMP001",
    name: "Joey",
    description: "Underperforming",
    avatar: "/avatars/Joey.png",
  },
  {
    id: "EMP0014",
    name: "Ross",
    description: "Unrecognized efforts",
    avatar: "/avatars/Monica.png",
  },
  {
    id: "EMP003",
    name: "Rachel",
    description: "Dissatisfied",
    avatar: "/avatars/Rachel.png",
  },
  {
    id: "EMP004",
    name: "Monica",
    description: "Burned out",
    avatar: "/avatars/Ross.png",
  },
];

const initialState: PersonaState = {
  persona: undefined,
  available_personas: personas,
};

const personaSlice = createSlice({
  name: "persona",
  initialState,
  reducers: {
    setPersona: (state, action) => {
      state.persona = action.payload;
    },
  },
});

export const { setPersona } = personaSlice.actions;
export default personaSlice.reducer;
