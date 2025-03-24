import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { BsClock } from "react-icons/bs";
import { BsCalendarEvent } from "react-icons/bs";
import { BiMessage } from "react-icons/bi";
import { FiPhone } from "react-icons/fi";

const employeesData = [
    {
        name: "Michael",
        team: "Engineering",
        employeeId: "EMP0008",
        scores: [
            { name: "HR Intervention Score", value: 8, color: "red", percentage: 65 },
            { name: "Avg. Morale Score", value: 7, color: "green", percentage: 60 },
            { name: "Avg. Engagement Score", value: 9, color: "green", percentage: 80 },
            { name: "Avg. Retention Risk Score", value: 6, color: "green", percentage: 55 },
            { name: "Avg. Retention Risk Score", value: 7, color: "green", percentage: 65 },
        ],
        suggestion: "Talk to the employee regarding lorem ipsum dolar epmit. Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit",
        availability: [
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" }
        ]
    },
    {
        name: "Sarah",
        team: "Marketing",
        employeeId: "EMP0009",
        scores: [
            { name: "HR Intervention Score", value: 9, color: "red", percentage: 70 },
            { name: "Avg. Morale Score", value: 6, color: "green", percentage: 55 },
            { name: "Avg. Engagement Score", value: 7, color: "green", percentage: 65 },
            { name: "Avg. Retention Risk Score", value: 8, color: "green", percentage: 75 },
            { name: "Avg. Retention Risk Score", value: 7, color: "green", percentage: 65 },
        ],
        suggestion: "Talk to the employee regarding lorem ipsum dolar epmit. Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit",
        availability: [
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" }
        ]
    },
    // Copy the same structure for other employees
    {
        name: "David",
        team: "Sales",
        employeeId: "EMP0010",
        scores: [
            { name: "HR Intervention Score", value: 7, color: "red", percentage: 60 },
            { name: "Avg. Morale Score", value: 8, color: "green", percentage: 70 },
            { name: "Avg. Engagement Score", value: 6, color: "green", percentage: 55 },
            { name: "Avg. Retention Risk Score", value: 9, color: "green", percentage: 80 },
            { name: "Avg. Retention Risk Score", value: 8, color: "green", percentage: 75 },
        ],
        suggestion: "Talk to the employee regarding lorem ipsum dolar epmit. Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit",
        availability: [
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" }
        ]
    },
    {
        name: "Emma",
        team: "Product",
        employeeId: "EMP0011",
        scores: [
            { name: "HR Intervention Score", value: 9, color: "red", percentage: 80 },
            { name: "Avg. Morale Score", value: 5, color: "green", percentage: 50 },
            { name: "Avg. Engagement Score", value: 7, color: "green", percentage: 65 },
            { name: "Avg. Retention Risk Score", value: 8, color: "green", percentage: 70 },
            { name: "Avg. Retention Risk Score", value: 6, color: "green", percentage: 60 },
        ],
        suggestion: "Talk to the employee regarding lorem ipsum dolar epmit. Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit",
        availability: [
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" }
        ]
    },
    {
        name: "John",
        team: "Design",
        employeeId: "EMP0012",
        scores: [
            { name: "HR Intervention Score", value: 8, color: "red", percentage: 70 },
            { name: "Avg. Morale Score", value: 7, color: "green", percentage: 65 },
            { name: "Avg. Engagement Score", value: 9, color: "green", percentage: 85 },
            { name: "Avg. Retention Risk Score", value: 6, color: "green", percentage: 60 },
            { name: "Avg. Retention Risk Score", value: 7, color: "green", percentage: 70 },
        ],
        suggestion: "Talk to the employee regarding lorem ipsum dolar epmit. Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit",
        availability: [
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" }
        ]
    },
    {
        name: "Lisa",
        team: "Research",
        employeeId: "EMP0013",
        scores: [
            { name: "HR Intervention Score", value: 7, color: "red", percentage: 65 },
            { name: "Avg. Morale Score", value: 8, color: "green", percentage: 75 },
            { name: "Avg. Engagement Score", value: 6, color: "green", percentage: 60 },
            { name: "Avg. Retention Risk Score", value: 9, color: "green", percentage: 85 },
            { name: "Avg. Retention Risk Score", value: 7, color: "green", percentage: 70 },
        ],
        suggestion: "Talk to the employee regarding lorem ipsum dolar epmit. Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit",
        availability: [
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" }
        ]
    },
    {
        name: "Robert",
        team: "IT Support",
        employeeId: "EMP0014",
        scores: [
            { name: "HR Intervention Score", value: 8, color: "red", percentage: 75 },
            { name: "Avg. Morale Score", value: 6, color: "green", percentage: 60 },
            { name: "Avg. Engagement Score", value: 7, color: "green", percentage: 70 },
            { name: "Avg. Retention Risk Score", value: 8, color: "green", percentage: 75 },
            { name: "Avg. Retention Risk Score", value: 7, color: "green", percentage: 65 },
        ],
        suggestion: "Talk to the employee regarding lorem ipsum dolar epmit. Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit",
        availability: [
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" }
        ]
    },
    {
        name: "Emily",
        team: "Customer Success",
        employeeId: "EMP0015",
        scores: [
            { name: "HR Intervention Score", value: 9, color: "red", percentage: 85 },
            { name: "Avg. Morale Score", value: 5, color: "green", percentage: 55 },
            { name: "Avg. Engagement Score", value: 7, color: "green", percentage: 70 },
            { name: "Avg. Retention Risk Score", value: 8, color: "green", percentage: 80 },
            { name: "Avg. Retention Risk Score", value: 6, color: "green", percentage: 60 },
        ],
        suggestion: "Talk to the employee regarding lorem ipsum dolar epmit. Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit.Talk to the employee regarding lorem ipsum dolar epmit",
        availability: [
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" },
            { time: "2pm - 3pm", date: "24/03/25" }
        ]
    }
];

const EmployeeCard = ({ employee, onClick }) => {
    return (
        <div className="max-w-md rounded-xl text-[12px] bg-white border-gray-200 border-2">
            {/* Header with profile info */}
            <div className="p-2 flex items-center gap-4 border-b border-gray-300">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                    <GoPerson size={24} className="text-gray-500" />
                </div>
                <div>
                    <h2 className="text-xl ">{employee.name}</h2>
                    <p className="text-gray-700">{employee.team}</p>
                    <p className="text-gray-400">{employee.employeeId}</p>
                </div>
            </div>

            {/* Score sections */}
            <div className="p-4 space-y-2">
                {employee.scores.map((score, index) => (
                    <React.Fragment key={`${employee.employeeId}-score-${index}`}>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">{score.name}</span>
                            <span className={`font-medium ${score.color === 'red' ? 'text-red-500' : ''}`}>
                                {score.value}
                            </span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                            <div
                                className={`h-2 rounded-full ${score.color === 'red' ? 'bg-[#F36D65]' : 'bg-[#80C342]'}`}
                                style={{ width: `${score.percentage}%` }}
                            ></div>
                        </div>
                    </React.Fragment>
                ))}

                {/* View More button */}
                <div className="flex justify-end mt-6">
                    <button 
                        onClick={() => onClick(employee.employeeId)}
                        className="px-4 py-1 border border-gray-300 rounded-md text-gray-800 text-[12px] hover:bg-gray-50 hover:cursor-pointer"
                    >
                        View More
                    </button>
                </div>
            </div>
        </div>
    );
};

const ExpandedEmployeeView = ({ employee, onClose }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full bg-white rounded-xl border-2 border-gray-200 p-4 animate-fadeIn">
            {/* First column: Basic card */}
            <div className="md:col-span-1">
                <div className="p-2 flex items-center gap-4 border-b border-gray-300">
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                        <GoPerson size={24} className="text-gray-500" />
                    </div>
                    <div>
                        <h2 className="text-xl">{employee.name}</h2>
                        <p className="text-gray-700">{employee.team}</p>
                        <p className="text-gray-400">{employee.employeeId}</p>
                    </div>
                </div>

                {/* Score sections */}
                <div className="p-4 space-y-2">
                    {employee.scores.map((score, index) => (
                        <React.Fragment key={`${employee.employeeId}-expanded-score-${index}`}>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">{score.name}</span>
                                <span className={`font-medium ${score.color === 'red' ? 'text-red-500' : ''}`}>
                                    {score.value}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full">
                                <div
                                    className={`h-2 rounded-full ${score.color === 'red' ? 'bg-[#F36D65]' : 'bg-[#80C342]'}`}
                                    style={{ width: `${score.percentage}%` }}
                                ></div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Second column: Suggestion */}
            <div className="md:col-span-1">
                <h3 className="font-medium text-lg mb-2">Suggestion</h3>
                <p className="text-gray-600 text-sm">
                    {employee.suggestion}
                </p>
            </div>

            {/* Third column: Availability */}
            <div className="md:col-span-1">
                <h3 className="font-medium text-lg mb-2">Employee availability</h3>
                <div className="space-y-2">
                    {employee.availability.map((slot, index) => (
                        <div 
                            key={`availability-${index}`}
                            className="flex items-center justify-between border border-gray-300 rounded-md p-2"
                        >
                            <div className="flex items-center">
                                <BsClock className="text-gray-500 mr-2" />
                                <span>{slot.time}</span>
                            </div>
                            <div className="flex items-center">
                                <span>{slot.date}</span>
                                <div className="ml-2 w-4 h-4 rounded-full border border-gray-300"></div>
                            </div>
                        </div>
                    ))}
                    
                    <div className="flex justify-between mt-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-800 text-sm">
                            <BsCalendarEvent />
                            Schedule a Meet
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-800 text-sm">
                            <BiMessage />
                            Message
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-800 text-sm">
                            <FiPhone />
                            Phone Call
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const [expandedEmployeeId, setExpandedEmployeeId] = useState(null);
    
    const handleViewMore = (employeeId) => {
        setExpandedEmployeeId(employeeId);
    };
    
    const handleCloseExpanded = () => {
        setExpandedEmployeeId(null);
    };
    
    const expandedEmployee = employeesData.find(employee => employee.employeeId === expandedEmployeeId);

    return (
        <div className="flex justify-center min-h-screen">
            <div className='w-1/5 bg-gray-200 p-4'>
                <h1 className="text-3xl font-semibold">
                    <span className="text-black font-bold">Deloitte</span>
                    <span className="text-green-500">.</span>
                </h1>
            </div>
            <div className='w-4/5 bg-white p-4'>
                <h2 className="text-2xl font-semibold">High-Concern Employee({employeesData.length})</h2>
                <div className="flex items-center mt-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <CiSearch size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Employee"
                            className="border border-gray-300 rounded-sm p-2 pl-10 focus:outline-none focus:ring-blue-500"
                            style={{ width: '400px' }}
                        />
                    </div>
                </div>
                
                {expandedEmployeeId && (
                    <div className="mt-6 transition-all duration-300 ease-in-out">
                        <ExpandedEmployeeView employee={expandedEmployee} onClose={handleCloseExpanded} />
                    </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {employeesData.map((employee) => (
                        <EmployeeCard 
                            key={employee.employeeId} 
                            employee={employee} 
                            onClick={handleViewMore}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Add animation CSS
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default AdminDashboard;