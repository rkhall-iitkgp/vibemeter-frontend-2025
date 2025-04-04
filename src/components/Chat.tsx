import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Smile, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

/**
 * Defines the structure of a chat message
 * @property {number} id - Unique identifier for the message
 * @property {"user" | "ai"} sender - Who sent the message
 * @property {string} text - Content of the message
 * @property {Date} timestamp - When the message was sent
 * @property {boolean} isEdited - Whether the message has been edited
 */
interface Message {
  id: number
  sender: "user" | "ai"
  text: string
  timestamp: Date
  isEdited?: boolean
}

/**
 * ChatPage Component
 * A responsive chat interface that simulates conversation with an AI assistant.
 * Features include:
 * - Message history
 * - Typing indicators
 * - Auto-expanding text input
 * - Emoji picker
 * - Suggested replies
 * - Turn-based conversation flow
 */
export default function ChatPage() {
  // Initial chat history with sample messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Hello! How can I assist you today?",
      timestamp: new Date(),
    },
    {
      id: 2,
      sender: "user",
      text: "Hi! I need help with my project.",
      timestamp: new Date(),
    },
    {
      id: 3,
      sender: "ai",
      text: "I'd be happy to help! Could you please provide more details about your project?",
      timestamp: new Date(),
    },
  ])

  // Predefined quick reply options for common responses
  const suggestedReplies = useMemo(() => [
    "Tell me more about the requirements", 
    "What's the timeline?", 
    "Do you have any examples?"
  ], [])

  // State variables for managing the chat interface
  const [message, setMessage] = useState("") // Current message being typed
  const [showEmojiPicker, setShowEmojiPicker] = useState(false) // Emoji picker visibility
  const [isTyping, setIsTyping] = useState(false) // AI typing animation state
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false) // Prevents sending multiple messages while waiting

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
   * Handles sending a new message and simulates AI response
   * Implements turn-based conversation flow with waiting states and animations
   * @param {string} text - The message to send
   */
  const handleSendMessage = useCallback((text: string) => {
    if (!text.trim() || isWaitingForResponse) return

    // Add user message immediately
    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: text,
      timestamp: new Date(),
    }

    setMessages((prev) => {
      // Only keep last 50 messages for performance
      const messageHistory = [...prev, newUserMessage];
      if (messageHistory.length > 50) {
        return messageHistory.slice(messageHistory.length - 50);
      }
      return messageHistory;
    });
    
    // Simulate AI response with sequential timeouts
    const waitingTimer = setTimeout(() => {
      setIsWaitingForResponse(true)
      
      const typingTimer = setTimeout(() => {
        setIsTyping(true)
        
        const responseTimer = setTimeout(() => {
          setIsTyping(false)
          const aiResponse: Message = {
            id: Date.now() + 1,
            sender: "ai",
            text: "I've received your message. How can I help further?",
            timestamp: new Date(),
          }
          setMessages((prev) => {
            // Only keep last 50 messages for performance
            const messageHistory = [...prev, aiResponse];
            if (messageHistory.length > 50) {
              return messageHistory.slice(messageHistory.length - 50);
            }
            return messageHistory;
          });
          setIsWaitingForResponse(false)
        }, 800) // Slightly faster response time
        
        return () => clearTimeout(responseTimer);
      }, 300)
      
      return () => clearTimeout(typingTimer);
    }, 100)
    
    return () => clearTimeout(waitingTimer);
  }, [isWaitingForResponse])

  /**
   * Form submission handler for sending messages
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(message)
    setMessage("")
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.style.height = '30px' // Reset to single line
      inputRef.current.style.overflowY = 'hidden'
      inputRef.current.blur()
    }
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
       width: '390px', 
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
          <p className="text-lime-500">Online</p>
        </div>
      </div>

      {/* Messages Area - Displays conversation history */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 will-change-scroll" 
           style={{ scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}>
        {messages.map((message, index) => {
          // Only animate recent messages (last 5) for better performance
          const isRecent = index >= Math.max(0, messages.length - 5);
          
          return (
            <div 
              key={message.id} 
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              style={isRecent ? {
                animation: `fadeIn 0.3s ease-out forwards`,
                opacity: 0,
                transform: 'translateY(10px)'
              } : {}}
            >
              {/* Show avatar only for AI messages */}
              {message.sender === "ai" && (
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/api/placeholder/40/40" alt="AI Assistant" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              {/* Message bubble with different styling for user vs AI */}
              <div className={cn(
                "max-w-[75%] p-3 relative", 
                message.sender === "user" 
                  ? "bg-lime-500 text-white rounded-tl-xl rounded-bl-xl rounded-br-xl hover:bg-lime-600" 
                  : "bg-gray-100 text-gray-700 rounded-tr-xl rounded-bl-xl rounded-br-xl hover:bg-gray-200"
              )}>
                <p className="whitespace-pre-wrap break-words">{message.text}</p>
              </div>
            </div>
          );
        })}
        
        {/* Typing indicator - Animated dots to show AI is typing */}
        {isTyping && (
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
                {[1,2,3].map((dot) => (
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

      {/* Suggested Replies - Quick response options */}
      <div className="p-2 border-t max-h-32 overflow-y-auto">
        <p className="text-gray-500 mb-1 text-xs font-normal">Suggested replies:</p>
        <div className="flex flex-wrap gap-1 pb-1">
          {suggestedReplies.map((reply, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="text-xs font-normal whitespace-nowrap rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 flex-shrink-0 transition-all duration-200 active:scale-95" 
              onClick={() => handleSendMessage(reply)}
              disabled={isWaitingForResponse}
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
            disabled={isWaitingForResponse}
          >
            <Smile size={24} />
          </Button>
          
          {/* Message input - Auto-growing textarea with scrolling */}
          <div className="relative flex-1 mx-2 overflow-hidden rounded-2xl">
            <textarea 
              ref={inputRef}
              value={message} 
              onChange={(e) => {
                setMessage(e.target.value)
                autoGrow(e.target)
              }}
              onKeyDown={handleKeyDown}
              disabled={isWaitingForResponse}
              placeholder={isWaitingForResponse ? "Waiting for response..." : "Type your message..."} 
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
            disabled={!message.trim() || isWaitingForResponse}
          >
            <Send size={20} className={message.trim() ? "animate-pulse" : ""} />
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
                    handleSendMessage(emoji);
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