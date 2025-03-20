import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	connectWebSocket,
	disconnectWebSocket,
	sendMessage
} from '../store/actions/webSocketActions';

import { RootState } from '../store';

export const useChat = () => {
	const dispatch = useDispatch();
	const [inputMessage, setInputMessage] = useState<string>('');

	// Get values from Redux store
	const messages = useSelector((state: RootState) => state.chat.messages);
	const connectionStatus = useSelector((state: RootState) => state.chat.connectionStatus);
	const isTyping = useSelector((state: RootState) => state.chat.isBotTyping);
	const isThinking = useSelector((state: RootState) => state.chat.isBotThinking);
	const error = useSelector((state: RootState) => state.chat.error);

	// Connect to WebSocket when hook is first used
	useEffect(() => {
		// Connect to WebSocket
		dispatch(connectWebSocket());

		// Disconnect when component unmounts
		return () => {
			dispatch(disconnectWebSocket());
		};
	}, [dispatch]);

	// Handle sending a message
	const sendUserMessage = () => {
		if (inputMessage.trim() && connectionStatus === 'connected') {
			dispatch(sendMessage(inputMessage));
			setInputMessage('');
		}
	};

	const reconnect = () => {
		dispatch(connectWebSocket());
	};

	return {
		messages,
		inputMessage,
		setInputMessage,
		sendUserMessage,
		connectionStatus,
		reconnect,
		isTyping,
		isThinking,
		error,
	};
};