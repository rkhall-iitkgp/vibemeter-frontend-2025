import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatbotBody from '@/components/chatbotBody';

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openChat = (): void => {
    setIsOpen(true);
  };

  const closeChat = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Import and use ChatbotBody */}
      <ChatbotBody isOpen={isOpen} onClose={closeChat} />
      
      {/* Chat Button - Only visible when chat is closed */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="
            bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 
            transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            fixed bottom-4 right-4 z-50
          "
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </>
  );
};

export default ChatbotButton;