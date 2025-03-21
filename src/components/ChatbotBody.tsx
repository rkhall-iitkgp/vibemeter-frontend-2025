import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';

// Define message structure
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

interface ChatbotBodyProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotBody: React.FC<ChatbotBodyProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [initialGreetingSent, setInitialGreetingSent] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Animate elements when sidebar opens
  useEffect(() => {
    if (isOpen) {
      // Stagger animations
      setTimeout(() => setShowText(true), 300);
      setTimeout(() => setShowButtons(true), 600);
    } else {
      setShowText(false);
      setShowButtons(false);
    }
  }, [isOpen]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send initial greeting when chat first shows
  useEffect(() => {
    if (showChat && !initialGreetingSent) {
      setTimeout(() => {
        addBotMessage("Hi there! How can I help you today?");
        setInitialGreetingSent(true);
      }, 500);
    }
  }, [showChat, initialGreetingSent]);

  // Function to send user message
  const sendMessage = () => {
    if (!message.trim()) return;

    // If this is the first message, show the chat interface
    if (!showChat) {
      setShowChat(true);
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);

    // Clear input
    setMessage('');

    // Simulate bot response (replace with actual chatbot logic later)
    setTimeout(() => {
      getBotResponse(message);
    }, 1000);
  };

  // Function to handle button emotions
  const handleEmotionSelection = (emotion: string) => {
    // Show chat interface
    setShowChat(true);
    
    // Add user message based on emotion button
    const userMessage: Message = {
      id: Date.now().toString(),
      content: emotion,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response based on emotion
    setTimeout(() => {
      let response = "";
      switch (emotion) {
        case "I'm feeling good 😊":
          response = "That's wonderful to hear! What's been going well for you?";
          break;
        case "I'm feeling stressed 😟":
          response = "I'm sorry to hear you're feeling stressed. Would you like to talk about what's causing it?";
          break;
        case "A bit down 😔":
          response = "I understand how that feels. Would you like to share what's making you feel down?";
          break;
        default:
          response = "Thank you for sharing. How can I support you today?";
      }
      addBotMessage(response);
    }, 1000);
  };

  // Add bot message
  const addBotMessage = (content: string) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      content: content,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, botMessage]);
  };

  // Get bot response based on user input
  const getBotResponse = (userInput: string) => {
    const userInputLower = userInput.toLowerCase();
    let response = "";

    // Simple response logic - replace with your chatbot AI or API call
    if (userInputLower.includes("hello") || userInputLower.includes("hi")) {
      response = "Hello! How are you feeling today?";
    } else if (userInputLower.includes("help")) {
      response = "I'm here to help! What's on your mind?";
    } else if (userInputLower.includes("stress") || userInputLower.includes("anxiety")) {
      response = "I understand stress can be difficult. Would you like to try a quick breathing exercise?";
    } else if (userInputLower.includes("sad") || userInputLower.includes("down")) {
      response = "I'm sorry you're feeling down. Would you like to talk about what's bothering you?";
    } else if (userInputLower.includes("thank")) {
      response = "You're welcome! I'm always here if you need to talk.";
    } else {
      response = "I appreciate you sharing that with me. How does that make you feel?";
    }

    addBotMessage(response);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div
      className={`pb-4 w-[30%] h-screen bg-dark-grey flex flex-col justify-between ml-auto transform transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} >
      <div className="p-4">
        <button
          onClick={onClose}
          className="text-primary-green hover:text-primary-green/80 transition-colors transform hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <ArrowRight size={24} />
        </button>
      </div>
     
      {!showChat ? (
        // Initial Welcome Screen
        <>
          <div className="flex flex-col items-center justify-center mt-16 mb-8">
            <div className="w-40 h-40 rounded-full border-2 border-primary-green bg-light-grey mb-4 animate-pulse"></div>
            <div className={`text-center transform transition-all duration-700 ${showText ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
              <h2 className="text-primary-green text-2xl font-semibold mb-1">
                  Hi there <span role="img" aria-label="waving hand" className="inline-block animate-bounce">👋</span> I'm Lumi
              </h2>
              <p className="text-light-grey">your friendly wellbeing companion.</p>
            </div>
          </div>
         
          <div className=''>
            {/* Feeling Selection Buttons */}
            <div className={`flex flex-col items-start gap-2 pl-5 pr-5 transform transition-all duration-700 ${showButtons ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button 
                className="bg-dark-grey text-white border border-primary-green rounded-[8px] px-6 py-2 hover:bg-primary-green hover:text-dark-grey hover:shadow-lg active:shadow-inner active:scale-95 transform transition-all duration-300 w-full"
                onClick={() => handleEmotionSelection("I'm feeling good 😊")}
              >
                I'm feeling good 😊
              </button>
              <div className="flex gap-2 w-full">
                <button 
                  className="bg-dark-grey text-white border border-primary-green rounded-[8px] px-6 py-2 hover:bg-primary-green hover:text-dark-grey hover:shadow-lg active:shadow-inner active:scale-95 transform transition-all duration-300 flex-1"
                  onClick={() => handleEmotionSelection("I'm feeling stressed 😟")}
                >
                  I'm feeling stressed 😟
                </button>
                <button 
                  className="bg-dark-grey text-white border border-primary-green rounded-[8px] px-6 py-2 hover:bg-primary-green hover:text-dark-grey hover:shadow-lg active:shadow-inner active:scale-95 transform transition-all duration-300 flex-1"
                  onClick={() => handleEmotionSelection("A bit down 😔")}
                >
                  A bit down 😔
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Chat Interface - Modified for bottom-to-top flow
        <>
          <div className="flex-1 overflow-y-auto flex flex-col-reverse px-4 pt-4">
            <div ref={messagesEndRef} />
            {messages.slice().reverse().map((msg) => (
              msg.sender === 'user' ? (
                <UserMessage 
                  key={msg.id} 
                  content={msg.content} 
                  timestamp={msg.timestamp} 
                />
              ) : (
                <BotMessage 
                  key={msg.id} 
                  content={msg.content} 
                  timestamp={msg.timestamp} 
                />
              )
            ))}
          </div>
        </>
      )}
             
      {/* Chat Input - shadcn/ui */}
      <form onSubmit={handleSubmit} className="pl-5 pr-5 pt-2 transform transition-all duration-700">
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Write a message"
            className="flex-1 bg-white text-black border-none rounded-[8px] h-12 focus-visible:ring-primary-green focus-visible:ring-offset-0 shadow-md hover:shadow-lg transition-shadow duration-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            className="rounded-[8px] bg-primary-green hover:bg-primary-green/90 hover:shadow-lg active:shadow-inner active:scale-95 h-12 w-12 flex items-center justify-center transform transition-all duration-300"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotBody;