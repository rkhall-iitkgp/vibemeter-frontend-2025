import React, { useState } from 'react';

interface MeetingSchedulerProps {
  participantName: string;
  participantId: string;
  participantGroup: string;
  onSchedule?: (meetingDetails: MeetingDetails) => void;
  onCancel?: () => void;
  onClose?: () => void;
}

interface MeetingDetails {
  participantName: string;
  participantId: string;
  meetingType: string;
  date: string;
  time: string;
  meetLocationType: string;
  agenda: string;
}

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({
  participantName,
  participantId,
  participantGroup,
  onSchedule,
  onCancel,
  onClose
}) => {
  const [meetingType, setMeetingType] = useState<string>('One-on-One Intervention');
  const [date, setDate] = useState<string>('2025-04-08');
  const [time, setTime] = useState<string>('10:00 AM - 10:30 AM');
  const [meetLocationType, setMeetLocationType] = useState<string>('Virtual Meeting');
  const [agenda, setAgenda] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSchedule) {
      onSchedule({
        participantName,
        participantId,
        meetingType,
        date,
        time,
        meetLocationType,
        agenda
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 relative">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <h1 className="text-2xl font-bold mb-4">Schedule Meet with {participantName}</h1>
      
      <div className="mb-6 flex items-center p-4 border border-gray-200 rounded-lg">
        <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-gray-700">
            <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"/>
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold">{participantName}</h2>
          <p className="text-gray-500">{participantGroup}</p>
        </div>
        <div className="text-gray-400">#{participantId}</div>
      </div>
      
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="meetLocationType" className="block font-bold mb-2">Meet Type</label>
          <select 
            id="meetLocationType" 
            className="w-full p-2 border border-gray-300 rounded"
            value={meetLocationType}
            onChange={(e) => setMeetLocationType(e.target.value)}
          >
            <option value="Virtual Meeting">Virtual Meeting</option>
            <option value="Offline Meeting">Offline Meeting</option>
          </select>
        </div>
        
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="date" className="block font-bold mb-2">Date</label>
            <input 
              type="date" 
              id="date" 
              className="w-full p-2 border border-gray-300 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
            <div className="flex-1">
            <label htmlFor="time" className="block font-bold mb-2">Time</label>
            <input 
              type="time" 
              id="time" 
              className="w-full p-2 border border-gray-300 rounded"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              min="09:00"
              max="17:00"
              step="1800"
              required
            />
            </div>
        </div>
        
        
        <div className="mb-4">
          <label htmlFor="agenda" className="block font-bold mb-2">Duration</label>
          <div className="flex items-center">
            <input 
              type="number" 
              min="1"
              className="w-24 p-2 border border-gray-300 rounded text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="ml-2 text-gray-500 ">minutes</span>
          </div>
        </div>
        
        <div className="flex gap-4 mt-6">
          <button 
            type="button" 
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="flex-1 bg-[#80C342] hover:bg-[#80c342ed] text-white font-bold py-3 px-4 rounded"
          >
            Schedule Meeting
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingScheduler;

// Example usage:
// <MeetingScheduler 
//   participantName="Ankan" 
//   participantId="EM1234564" 
//   participantGroup="Leadership Training #GRP12345" 
//   onSchedule={(details) => console.log(details)} 
//   onCancel={() => console.log('Cancelled')}
//   onClose={() => console.log('Closed')}
// />