// src/store/slices/suggestionsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SuggestionsState, Suggestion } from '../../types/index';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

// Define the initial state
const initialState: SuggestionsState = {
  items: [],
  loading: false,
  error: null
};

// Create async thunk for fetching suggestions
export const fetchSuggestions = createAsyncThunk<Suggestion[],void , {rejectValue : string}>( 
  'suggestions/fetchSuggestions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/suggestions`);
      
      if (!response.ok) {
        throw new Error('Server Error');
      }
      
      const data = await response.json();
      return data as Suggestion[];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

// Create the suggestions slice
const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    clearSuggestions: (state) => {
      state.items = [];
    },
    // You can add more reducers for other actions if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action: PayloadAction<Suggestion[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSuggestions } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;