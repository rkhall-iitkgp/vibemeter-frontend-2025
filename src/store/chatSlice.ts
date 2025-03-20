import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
export interface Message {
	id: string;
	content: string;
	sender: 'user' | 'bot';
	timestamp: number;
}

interface ChatState {
	messages: Message[];
	isBotTyping: boolean;
}

const initialState: ChatState = {
	messages: [],
	isBotTyping: false,
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<Message>) => {
			state.messages.push(action.payload);
		},
		
		appendMessageContent: (state, action: PayloadAction<{ id: string; content: string }>) => {
			const message = state.messages.find(msg => msg.id === action.payload.id);
			if (message) {
				message.content += action.payload.content;
			}
		},
		
		setBotTyping: (state, action: PayloadAction<boolean>) => {
			state.isBotTyping = action.payload;
		},
		
		clearMessages: (state) => {
			state.messages = [];
		},
	},
});

export const { addMessage, appendMessageContent, setBotTyping, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;