
import React from 'react';

const SkeletonPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-[6.5rem]  bg-[#D9D9D9] flex flex-col items-center py-6 space-y-6">
        {/* Profile Avatar */}
        <div className="w-[4rem] h-[3rem] rounded-[1.2rem]  left-[2.0625rem] bg-[#9D9898] animate-pulse"></div>
        
        {/* Spacer to push bottom icons to the bottom */}
        <div className="flex-grow"></div>
        
        {/* Bottom sidebar icons */}
        <div className="w-8.5 h-8.5  rounded-full bg-[#B2ACAC] animate-pulse"></div>
        <div className="w-8.5 h-8.5  rounded-full bg-[#B2ACAC] animate-pulse"></div>
        <div className="w-[3rem] h-[2.5rem] top-[57.375rem]  rounded-full bg-[#9D9898] animate-pulse"></div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 pl-10 pt-6">
        {/* Header */}
        <div className="mb-6">
          <div className="h-[2.6875rem] w-[8.1875rem]   bg-[#D9D9D9] rounded animate-pulse mb-2"></div>
          <div className="h-[2.6875rem] w-[19.3125rem]  bg-[#D9D9D9] rounded animate-pulse"></div>
        </div>
        
        {/* Main Card */}
        <div className="h-[15rem] w-[56.5625rem]  bg-[#D9D9D9] rounded-[1.25rem] animate-pulse mb-6"></div>
        
        {/* Sub-heading */}
        <div className="h-[2rem] w-[20.75rem]   bg-[#D9D9D9] rounded-[0.5rem] animate-pulse mb-6"></div>
        
        {/* Content Cards */}
        <div className="space-y-3 ">
          <div className="w-[56.5625rem] h-[3rem]  bg-[#D9D9D9] rounded-lg animate-pulse"></div>
          <div className="w-[56.5625rem] h-[3rem]  bg-[#D9D9D9] rounded-lg animate-pulse"></div>
          <div className="w-[56.5625rem] h-[3rem]  bg-[#D9D9D9] rounded-lg animate-pulse"></div>
          <div className="w-[56.5625rem] h-[3rem]  bg-[#D9D9D9] rounded-lg animate-pulse"></div>
        </div>
      </div>
      
      {/* Right Action Button */}
      <div className="absolute bottom-7 right-15">
        <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-[#D9D9D9] animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonPage;
