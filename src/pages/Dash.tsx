import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';

const ChecklistItem = ({ icon, title, description, time }) => {
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="mr-4">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="text-gray-700 font-medium">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <div className="text-gray-400 text-sm">
        {time}
      </div>
    </div>
  );
};

const data = [
  { name: 'Signed', value: 221, color: '#22C55E' }, // green
  { name: 'Unsigned', value: 23, color: '#FACC15' }, // yellow
  { name: 'Not Signed', value: 149, color: '#EF4444' }, // red
];
const total = data.reduce((acc, item) => acc + item.value, 0);

const Dash = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const tasks = [
    {
      id: 1,
      title: "Lunch slot pending",
      description: "You have your lunch slot yet",
      time: "09:00",
      icon: (
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </div>
      )
    },
    {
      id: 2,
      title: "Diwali incoming!",
      description: "Compose an email to send.",
      time: "Yesterday, 22:00",
      icon: (
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
          </svg>
        </div>
      )
    },
    {
      id: 3,
      title: "BOAT event upcoming!",
      description: "3 days to go!",
      time: "9:00 AM",
      icon: (
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <div className='flex justify-center h-screen'>
      <div className='w-1/20 bg-gray-200 p-4'>
        Side Bar
      </div>

      
      <div className='flex flex-col w-full'>
        <div className='w-full bg-blue-500 p-4'>
          Navbar
        </div>

        <div className='mt-2 ml-4'>
          <h1 className='text-3xl '>Good Afternoon, Name!</h1>
          <p className='mt-1 text-gray-400'>You have 12 tasks pending</p>
        </div>

            {/* status block */}
        <div className="p-4 border rounded-xl shadow-sm w-full max-w-md bg-white fixed top-42 left-4/10 mr-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold text-gray-700">Documents status</h3>
            <button className="text-sm font-medium text-blue-600 hover:underline">View Stats</button>
          </div>

          <div className="flex items-center gap-6">
            {/* Left: Text Data */}
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span><strong>221</strong> signed by all</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span><strong>23</strong> documents unsigned by all</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span><strong>149</strong> users have not signed</span>
              </div>
            </div>

            {/* Right: Ring Chart */}
            <div className="relative">
              <PieChart width={100} height={100}>
                <Pie
                  data={data}
                  dataKey="value"
                  outerRadius={45}
                  innerRadius={30}
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-sm">
                <span className="text-lg font-bold">{total}</span>
                <span className="text-xs text-gray-500">Total</span>
              </div>
            </div>
          </div>
        </div>

        {/* calender block */}
        <div className='p-4 border rounded-xl shadow-sm w-full max-w-md fixed top-42 mr-4 mt-4 bg-blue-100 h-44 left-1/10'>

        </div>


        <div className="fixed right-0 top-15 bg-white rounded-xl shadow-sm p-4 mr-4 mt-4 flex items-center justify-between w-52">
          <div>
            <div className="text-sm text-gray-500">Current time</div>
            <div className="text-xl font-semibold">{time}</div>
          </div>
          <Clock className="w-6 h-6 text-gray-400" />
        </div>

        <div className="fixed right-0 top-42 text-[15px] bg-white rounded-xl shadow-sm p-3 max-w-md mr-4 mt-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-700">Checklist</h2>
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              12 Pending
            </div>
          </div>

          <div className="border-t border-gray-200">
            {tasks.map(task => (
              <ChecklistItem
                key={task.id}
                icon={task.icon}
                title={task.title}
                description={task.description}
                time={task.time}
              />
            ))}
          </div>

          <button className="mt-4 w-full py-3 bg-blue-50 text-blue-500 rounded-lg font-medium hover:bg-blue-100 hover:cursor-pointer transition-colors">
            View All Tasks
          </button>
        </div>

        {/* red coloured block */}
        <div className="fixed right-0 top-146 bg-red-400 rounded-xl shadow-sm p-3 w-80 h-52 mr-4 mt-4">
        </div>


      </div>
    </div>
  );
};

export default Dash;