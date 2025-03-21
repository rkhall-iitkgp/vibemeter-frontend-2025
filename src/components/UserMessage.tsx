import React, { useEffect, useState } from 'react';

// User Message Component
interface UserMessageProps {
  content: string;
  timestamp?: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ content, timestamp }) => {
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
    <div className="flex justify-end w-full mb-4">
      <div 
        className={`
          bg-primary-green text-white px-4 py-3 rounded-lg rounded-tr-none max-w-[80%]
          transform transition-all duration-300 ease-out origin-bottom-right
          ${isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-0'}
          hover:shadow-md
        `}
      >
        {content}
        {timestamp && (
          <div className={`
            text-xs mt-1 text-white/70 text-right
            transition-opacity duration-500 delay-200
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}>
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMessage;