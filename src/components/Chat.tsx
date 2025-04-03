"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Smile, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  sender: "user" | "ai"
  text: string
  timestamp: Date
  isEdited?: boolean
}

export default function ChatPage() {
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

  const suggestedReplies = useMemo(() => [
    "Tell me more about the requirements", 
    "What's the timeline?", 
    "Do you have any examples?"
  ], [])

  const [message, setMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const emojis = useMemo(() => ["😊", "👍", "🎉", "❤️", "🙏", "👋"], [])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = useCallback((text: string) => {
    if (!text.trim()) return

    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])

    // Optimized typing simulation
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
        setMessages((prev) => [...prev, aiResponse])
      }, 800)

      return () => {
        clearTimeout(typingTimer)
        clearTimeout(responseTimer)
      }
    }, 300)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(message)
    setMessage("")
    inputRef.current?.blur()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="flex flex-col mx-auto bg-white"
     style={{ 
       height: '100vh', 
       width: '390px', 
       maxHeight: '844px', 
       display: 'grid', 
       gridTemplateRows: 'auto 1fr auto auto' 
     }}>
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

      <div className="flex-1 overflow-y-auto p-3 space-y-3 will-change-scroll">
        {messages.map((message, index) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            style={{
              animation: `fadeIn 0.3s ease-out ${index * 0.05}s forwards`,
              opacity: 0,
              transform: 'translateY(10px)'
            }}
          >
            {message.sender === "ai" && (
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="/api/placeholder/40/40" alt="AI Assistant" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div className={cn(
              "max-w-[75%] p-2 relative transition-all duration-200 ease-in-out", 
              message.sender === "user" 
                ? "bg-lime-500 text-white rounded-tl-xl rounded-bl-xl rounded-br-xl hover:bg-lime-600" 
                : "bg-gray-100 text-gray-700 rounded-tr-xl rounded-bl-xl rounded-br-xl hover:bg-gray-200"
            )}>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-bounce">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="/api/placeholder/40/40" alt="AI Assistant" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 text-gray-700 p-4 rounded-tr-xl rounded-bl-xl rounded-br-xl flex items-center">
              <span className="flex space-x-1">
                {[1,2,3].map((dot) => (
                  <span 
                    key={dot} 
                    className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"
                    style={{animationDelay: `${dot * 0.1}s`}}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 border-t max-h-32 overflow-y-auto">
        <p className="text-gray-500 mb-1 text-xs font-normal">Suggested replies:</p>
        <div className="flex flex-wrap gap-1 pb-1">
          {suggestedReplies.map((reply, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="text-xs font-normal whitespace-nowrap rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 flex-shrink-0 transition-all duration-200 active:scale-95" 
              onClick={() => handleSendMessage(reply)}
            >
              {reply}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-3 border-t relative">
        <form onSubmit={handleSubmit} className="flex items-center">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-gray-700 transition-transform duration-200 hover:scale-110 active:scale-90" 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile size={24} />
          </Button>
          <Input 
            ref={inputRef}
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            onKeyDown={handleKeyDown}
            placeholder="Type your message..." 
            className="flex-1 mx-2 rounded-full focus:ring-2 focus:ring-lime-300 transition-all duration-200 h-9" 
          />
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full bg-lime-500 hover:bg-lime-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm" 
            disabled={!message.trim()}
          >
            <Send size={20} className={message.trim() ? "animate-pulse" : ""} />
          </Button>
        </form>

        {showEmojiPicker && (
          <Card className="absolute bottom-20 left-0 right-0 shadow-lg animate-slide-up">
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

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }

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

        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }

        .will-change-scroll {
          will-change: scroll-position;
        }
      `}} />
    </div>
  )
}