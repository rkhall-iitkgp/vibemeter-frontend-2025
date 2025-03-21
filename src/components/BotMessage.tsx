import React, { useEffect, useState } from 'react';

// Bot Message Component
interface BotMessageProps {
  content: string;
  timestamp?: string;
  avatar?: string;
}

const BotMessage: React.FC<BotMessageProps> = ({
  content,
  timestamp,
  avatar
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Trigger animation when component mounts
  useEffect(() => {
    // Small delay for a natural feel
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-full mb-4">
      <div className={`
        h-8 w-8 rounded-full bg-gray-300 mr-2 flex-shrink-0
        transition-opacity duration-300
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        {avatar && (
          <img
            src={avatar}
            alt="Bot avatar"
            className="h-full w-full rounded-full object-cover"
          />
        )}
      </div>
      <div 
        className={`
          bg-gray-300 text-gray-800 px-4 py-3 rounded-lg rounded-tl-none max-w-[80%]
          transform transition-all duration-300 ease-out origin-bottom-left
          ${isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-0'}
          hover:shadow-md
        `}
      >
        {content}
        {timestamp && (
          <div className={`
            text-xs mt-1 text-gray-500 text-right
            transition-opacity duration-500 delay-200
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BotMessage;