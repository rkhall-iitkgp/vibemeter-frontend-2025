import { useChat } from '@/hooks/useChat';
import React from 'react';

////////////////////////////////////////
//
// This is an example, please change it when the figma is ready
//
////////////////////////////////////////


export interface Message {
	id: string;
	content: string;
	role: 'user' | 'assistant';
	timestamp: number;
}

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
	return (
		<div className={`message ${message.role === 'user' ? 'user-message' : 'system-message'}`}>
			<div className="message-content">{message.content}</div>
			<div className="message-timestamp">
				{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
			</div>
		</div>
	);
};

const ChatMessageList: React.FC<{ messages: Message[] }> = ({ messages }) => {
	return (
		<div className="message-list">
			{messages.map((message) => (
				<ChatMessage key={message.id} message={message} />
			))}
		</div>
	);
};

const Chat: React.FC = () => {

	const {
		messages,
		inputMessage,
		setInputMessage,
		sendUserMessage,
		isThinking,
		isTyping,
		reconnect,
		connectionStatus,
		stopResponse,
	} = useChat();

	return (
		<div className="chat-container">
			<h2>Chat Example</h2>
			<ChatMessageList messages={messages} />
			{isThinking && <div>Bot is thinking</div>}
			{isTyping && <div>Bot is Typing</div>}
			<div className="chat-input">
				<input
					type="text"
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					onKeyPress={(e) => e.key === 'Enter' && sendUserMessage()}
					placeholder="Type a message..."
				/>
				{isTyping ?
					<button onClick={stopResponse}>Stop</button>
					:
					<button onClick={sendUserMessage}>Send</button>
				}
			</div>
			<style>{`
				.chat-container {
					max-width: 500px;
					margin: 0 auto;
					padding: 20px;
					border: 1px solid #ccc;
					border-radius: 8px;
					min-height: 100vh;
					display: flex;
					flex-direction: column;
				}
				
				.message-list {
					flex: 1;
					overflow-y: auto;
					margin-bottom: 20px;
				}
				
				.message {
					margin-bottom: 10px;
					padding: 10px;
					border-radius: 8px;
					max-width: 80%;
				}

				.message-content {
					word-wrap: break-word;}
				
				.user-message {
					background-color: #0084ff;
					color: white;
					margin-left: auto;
				}
				
				.system-message {
					background-color: #f1f0f0;
					margin-right: auto;
				}
				
				.message-timestamp {
					font-size: 0.7em;
					text-align: right;
					margin-top: 5px;
				}
				
				.chat-input {
					display: flex;
				}
				
				.chat-input input {
					flex: 1;
					padding: 10px;
					border: 1px solid #ccc;
					border-radius: 4px;
					margin-right: 10px;
				}
				
				button {
					padding: 10px 20px;
					background-color: #0084ff;
					color: white;
					border: none;
					border-radius: 4px;
					cursor: pointer;
				}
			`}</style>

			<div>Bot Status: Thinking {isThinking ? "true" : "false"}, Typing {isTyping ? "true" : "false"}</div>
			<div>Connection Status: {connectionStatus}</div>
			{connectionStatus !== 'connected' && <button onClick={reconnect}>Reconnect</button>}
		</div>
	);
};

export default Chat;