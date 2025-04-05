import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Smile, Send, RefreshCcw, Award, Battery, Phone, Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useChat } from "@/hooks/useChat"

/**
 * Defines the structure of a chat message
 * @property {number} id - Unique identifier for the message
 * @property {"user" | "ai"} role - Who sent the message
 * @property {string} text - Content of the message
 * @property {Date} timestamp - When the message was sent
 * @property {boolean} isEdited - Whether the message has been edited
 */
interface Message {
	id: number
	role: "user" | "ai"
	text: string
	timestamp: Date
	isEdited?: boolean
}

/**
 * ChatPage Component
 * A responsive chat interface that simulates conversation with an AI assistant.
 * Features include:
 * - Message history (with unlimited messages)
 * - Typing indicators
 * - Auto-expanding text input
 * - Emoji picker
 * - Suggested replies
 * - Turn-based conversation flow
 */
export default function ChatPage() {
	// Initial chat history with sample messages
	const {
		messages,
		sendUserMessage,
		inputMessage,
		setInputMessage,
		isThinking,
		isTyping,
		connectionStatus,
		reconnect
	} = useChat();

	const [persona, setPersona] = useState<string>("") // Persona state for the AI assistant
	// Array of available AI personas
	const availablePersonas = [
		{
			"name": "Alex",
			"identifier": "Dedicated but Burning Out",
			"iconColor": "#FF5733",
			"backgroundColor": "#FFF0EC",
			"icon": <Battery />
		},
		{
			"name": "Morgan",
			"identifier": "Skilled but Disconnected",
			"iconColor": "#3498DB",
			"backgroundColor": "#E8F4FD",
			"icon": <Phone />
		},
		{
			"name": "Jamie",
			"identifier": "Promoted but Overwhelmed",
			"iconColor": "#9B59B6",
			"backgroundColor": "#F4ECF7",
			"icon": <Clipboard />
		},
		{
			"name": "Taylor",
			"identifier": "Productive but Imbalanced",
			"iconColor": "#2ECC71",
			"backgroundColor": "#E8F8F1",
			"icon": <Award />
		},
		{
			"name": "Jordan",
			"identifier": "Talented but Undervalued",
			"iconColor": "#F1C40F",
			"backgroundColor": "#FEF9E7",
			"icon": <Award />
		}
	]

	// Predefined quick reply options for common responses
	const suggestedReplies = useMemo(() => [
		"Tell me more about the requirements",
		"What's the timeline?",
		"Do you have any examples?"
	], [])

	// State variables for managing the chat interface
	const [showEmojiPicker, setShowEmojiPicker] = useState(false) // Emoji picker visibility

	// Common emoji options for the emoji picker
	const emojis = useMemo(() => ["😊", "👍", "🎉", "❤️", "🙏", "👋"], [])

	// Refs for DOM manipulation
	const messagesEndRef = useRef<HTMLDivElement>(null) // Reference for auto-scrolling
	const inputRef = useRef<HTMLTextAreaElement>(null) // Reference for the textarea

	/**
	 * Auto-scrolls to the most recent message with enhanced smoothness
	 */
	useEffect(() => {
		// Optimized smooth scrolling using native browser animation
		const scrollToBottom = () => {
			messagesEndRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest'
			});
		};

		// Use RAF for next frame rendering to ensure smooth animation
		requestAnimationFrame(scrollToBottom);
	}, [messages, isTyping])


	/**
	 * Form submission handler for sending messages
	 * @param {React.FormEvent} e - Form event
	 */
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		sendUserMessage();
	}

	/**
	 * Keyboard handler for the textarea
	 * Submits on Enter, allows newline on Shift+Enter
	 * @param {React.KeyboardEvent<HTMLTextAreaElement>} e - Keyboard event
	 */
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSubmit(e as any)
		}
	}

	/**
	 * Auto-resize textarea based on content
	 * Grows up to 3 lines then shows scrollbar
	 * @param {HTMLTextAreaElement} textarea - The textarea element to resize
	 */
	const autoGrow = useCallback((textarea: HTMLTextAreaElement) => {
		// Reset height to auto for proper scrollHeight calculation
		textarea.style.height = 'auto'

		// Allow growing up to ~3 lines (60px)
		const maxHeight = 60
		const newHeight = Math.min(textarea.scrollHeight, maxHeight)
		textarea.style.height = `${newHeight}px`

		// Only show scrollbar when content exceeds max height
		textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
	}, [])

	return (
		<div className="flex flex-col mx-auto bg-white"
			style={{
				height: '100vh',
				width: '400px',
				maxHeight: '844px',
				display: 'grid',
				gridTemplateRows: 'auto 1fr auto auto'
			}}>
			{/* Header - Contains AI profile and status */}
			<div className="border-b p-3 flex items-center gap-2 shadow-sm">
				<Avatar className="h-12 w-12">
					<AvatarImage src="/api/placeholder/48/48" alt="AI Assistant" />
					<AvatarFallback>AI</AvatarFallback>
				</Avatar>
				<div>
					<h1 className="font-bold text-xl text-gray-800">AI Assistant</h1>
					{connectionStatus === 'connected' ?
						<p className="text-lime-500">Online</p>
						:
						<div className="flex gap-2">
							{connectionStatus === 'connecting' ?
								<p className="text-yellow-600">Connecting...</p>
								:
								<p className="text-red-500">Disconnected</p>
							}
							<button onClick={reconnect}><RefreshCcw size={16} className={connectionStatus === 'connecting' ? 'animate-spin' : ''} /></button>
						</div>
					}
				</div>
			</div>

			{persona === '' ?
				<div className="flex gap-4 w-full h-full items-center justify-around flex-wrap content-center">
					{availablePersonas.map((p) => (
						<button
							key={p.name}
							className={`flex-1 whitespace-nowrap rounded-md hover:bg-gray-100 border border-gray-400 text-gray-700 px-4 py-6 transition-all duration-200 active:scale-95`}
							onClick={() => setPersona(p.identifier)}
							style={{ backgroundColor: p.backgroundColor }}
						>
							<div className="flex flex-col items-center justify-center">
								{React.cloneElement(p.icon, { className: "mb-2 text-gray-500", size: 40, color: p.iconColor })}
								<p className="font-semibold">{p.name}</p>
								<p className="text-xs font-normal text-gray-500">{p.identifier}</p>
							</div>
						</button>
					))}
				</div>
				:
				<div className="flex-1 overflow-y-auto p-3 space-y-3 will-change-scroll"
					style={{ scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}>
					{messages.map((message: any) => {
						// Apply animation to all messages
						return (
							<div
								key={message.id}
								className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
								style={{
									animation: `fadeIn 0.3s ease-out forwards`,
									opacity: 0,
									transform: 'translateY(10px)'
								}}
							>
								{/* Show avatar only for AI messages */}
								{message.role === "assistant" && (
									<Avatar className="h-10 w-10 mr-3">
										<AvatarImage src="/api/placeholder/40/40" alt="AI Assistant" />
										<AvatarFallback>AI</AvatarFallback>
									</Avatar>
								)}
								{/* Message bubble with different styling for user vs AI */}
								<div className={cn(
									"max-w-[75%] p-3 relative",
									message.role === "user"
										? "bg-lime-500 text-white rounded-tl-xl rounded-bl-xl rounded-br-xl hover:bg-lime-600"
										: "bg-gray-100 text-gray-700 rounded-tr-xl rounded-bl-xl rounded-br-xl hover:bg-gray-200"
								)}>
									<p className="whitespace-pre-wrap break-words">{message.content}</p>
								</div>
							</div>
						);
					})}

					{/* Typing indicator - Animated dots to show AI is typing */}
					{isThinking && (
						<div className="flex justify-start" style={{
							animation: 'fadeIn 0.2s ease-out forwards',
							opacity: 0,
						}}>
							<Avatar className="h-10 w-10 mr-3">
								<AvatarImage src="/api/placeholder/40/40" alt="AI Assistant" />
								<AvatarFallback>AI</AvatarFallback>
							</Avatar>
							<div className="bg-gray-100 text-gray-700 p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl flex items-center">
								<span className="flex space-x-1">
									{[1, 2, 3].map((dot) => (
										<span
											key={dot}
											className="h-2 w-2 bg-gray-400 rounded-full"
											style={{
												animation: 'bounce 1.4s infinite ease-in-out',
												animationDelay: `${dot * 0.16}s`,
												animationFillMode: 'both',
											}}
										/>
									))}
								</span>
							</div>
						</div>
					)}

					{/* Anchor element for auto-scrolling */}
					<div ref={messagesEndRef} />
				</div>
			}

			{/* Suggested Replies - Quick response options */}
			<div className="p-2 border-t max-h-32 overflow-y-auto">
				<p className="text-gray-500 mb-1 text-xs font-normal">Suggested replies:</p>
				<div className="flex flex-wrap gap-1 pb-1">
					{suggestedReplies.map((reply, index) => (
						<Button
							key={index}
							variant="outline"
							className="text-xs font-normal whitespace-nowrap rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 flex-shrink-0 transition-all duration-200 active:scale-95"
							onClick={() => sendUserMessage(reply)}
							disabled={isTyping || isThinking}
						>
							{reply}
						</Button>
					))}
				</div>
			</div>

			{/* Input Area - Message composition and sending */}
			<div className="p-3 border-t relative">
				<form onSubmit={handleSubmit} className="flex items-center">
					{/* Emoji picker toggle button */}
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="text-gray-500 hover:text-gray-700 transition-transform duration-200 hover:scale-110 active:scale-90"
						onClick={() => setShowEmojiPicker(!showEmojiPicker)}
						disabled={isThinking || isTyping}
					>
						<Smile size={24} />
					</Button>

					{/* Message input - Auto-growing textarea with scrolling */}
					<div className="relative flex-1 mx-2 overflow-hidden rounded-2xl">
						<textarea
							ref={inputRef}
							value={inputMessage}
							onChange={(e) => {
								setInputMessage(e.target.value)
								autoGrow(e.target)
							}}
							onKeyDown={handleKeyDown}
							disabled={isThinking || isTyping}
							placeholder={isThinking ? "Waiting for response..." : "Type your message..."}
							className="w-full resize-none border border-gray-200 focus:outline-none textarea-focus-visible transition-all duration-200 text-sm rounded-2xl"
							style={{
								maxHeight: '60px', // Allow up to ~3 lines
								minHeight: '30px', // Start with 1 line
								lineHeight: '1.5',
								display: 'flex',
								alignItems: 'center',
								boxSizing: 'border-box',
								padding: '0 12px',
								overflowY: 'hidden',
								overscrollBehavior: 'contain', // Prevent scroll chaining
								scrollPadding: '2px', // Add padding for scrollbar
							}}
							rows={1}
						/>
					</div>

					{/* Send button - Disabled when waiting for response */}
					<Button
						type="submit"
						size="icon"
						className="rounded-full bg-lime-500 hover:bg-lime-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
						disabled={isThinking || isTyping || !inputMessage.trim()}
					>
						<Send size={20} className={inputMessage.trim() ? "animate-pulse" : ""} />
					</Button>
				</form>

				{/* Emoji Picker - Popup panel for emoji selection */}
				{showEmojiPicker && (
					<Card className="absolute bottom-20 left-0 right-0 shadow-lg z-10" style={{
						animation: 'slideUp 0.2s ease-out forwards',
					}}>
						<CardContent className="p-2 flex flex-wrap justify-center gap-2 max-w-full">
							{emojis.map((emoji) => (
								<Button
									key={emoji}
									variant="ghost"
									className="text-2xl w-12 h-12 flex items-center justify-center transition-transform duration-200 hover:scale-125 active:scale-90"
									onClick={() => {
										sendUserMessage(emoji);
										setShowEmojiPicker(false);
										inputRef.current?.blur();
									}}
								>
									{emoji}
								</Button>
							))}
						</CardContent>
					</Card>
				)}
			</div>

			{/* Global Styles - Animations and custom styling */}
			<style dangerouslySetInnerHTML={{
				__html: `
        /* Message fade-in animation */
        @keyframes fadeIn {
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }

        /* Emoji picker slide-up animation */
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Typing indicator bouncing dots animation */
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
            opacity: 0.5;
          }
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }
        
        /* GPU acceleration for animations */
        .flex {
          will-change: transform, opacity;
          transform: translateZ(0);
        }

        /* Optimize scrolling performance */
        .will-change-scroll {
          will-change: scroll-position;
          scroll-behavior: smooth;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch; /* For iOS devices */
        }
        
        /* Hide scrollbar buttons */
        .will-change-scroll::-webkit-scrollbar-button {
          display: none;
        }
        
        /* Custom scrollbar for chat */
        .will-change-scroll::-webkit-scrollbar {
          width: 5px;
        }
        
        .will-change-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .will-change-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(209, 213, 219, 0.5);
          border-radius: 20px;
        }
        
        /* Textarea styling */
        textarea {
          margin: 0;
          vertical-align: middle;
        }
        
        /* Custom scrollbar styling */
        textarea::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        
        textarea::-webkit-scrollbar-track {
          background: transparent;
          margin: 4px 0;
        }
        
        textarea::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 20px;
          border: 2px solid transparent;
        }
        
        textarea::-webkit-scrollbar-button {
          display: none;
        }
        
        /* Custom focus state styling for textarea */
        .textarea-focus-visible:focus {
          box-shadow: 0 0 0 3px rgba(163, 230, 53, 0.4);
          border: 2px solid #a3e635 !important; 
          outline: none;
        }
        
        textarea:focus {
          box-shadow: 0 0 0 3px rgba(163, 230, 53, 0.4);
          border: 2px solid #a3e635 !important;
          outline: none;
        }
      `}} />
		</div>
	)
}