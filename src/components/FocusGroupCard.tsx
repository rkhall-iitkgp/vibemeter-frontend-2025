import { FC } from 'react';
import { FocusGroup } from '../types';
import { useNavigate } from 'react-router-dom';

interface FocusGroupCardProps {
  focusGroup: FocusGroup;
}

const TagColors: Record<string, string> = {
  'Morality': 'bg-amber-100 text-amber-800',
  'Engagement': 'bg-teal-100 text-teal-800',
  'Cultural Score': 'bg-pink-100 text-pink-800',
  'Leave Impact': 'bg-green-100 text-green-800'
};

const FocusGroupCard: FC<FocusGroupCardProps> = ({ focusGroup }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/focus-group/${focusGroup.id}`);
  };

  return (
    <div 
      className="mb-4 rounded-lg border border-gray-200 bg-white p-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <div className="mb-2 flex justify-between">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-gray-900">{focusGroup.title}</h3>
          <span className="ml-2 text-sm text-gray-500">#{focusGroup.id}</span>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-green-600">Participants</p>
          <p className="text-sm text-gray-700">{focusGroup.participantCount} Members</p>
        </div>
      </div>
      
      <div className="mb-2 flex text-sm text-gray-500">
        <p>Created on {focusGroup.createdDate}</p>
        <div className="ml-4 flex space-x-2">
          {focusGroup.tags.map((tag, index) => (
            <span 
              key={index}
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TagColors[tag] || 'bg-gray-100 text-gray-800'}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <p className="text-sm text-gray-700">{focusGroup.description}</p>
    </div>
  );
};

export default FocusGroupCard;
