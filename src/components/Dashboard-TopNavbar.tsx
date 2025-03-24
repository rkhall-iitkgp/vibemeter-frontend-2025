import { FiSearch } from "react-icons/fi";
import dp from "../../public/Deloitte-removebg-preview 1.png"
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function DashboardTopNavbar(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="Dashboard-Top-Navbar flex flex-row items-center h-[60px] fixed top-0 w-screen bg-white space-x-[20px]">
            <ul className="Dashboard-pages flex flex-row ml-20 space-x-5 ">
                <li className="Dashboard-page1 p-[10px] bg-gray-200 rounded-md text-[14px] h-[40%] text-blue-600">Dashboard</li>
                <li className="Dashboard-page2 p-[10px] rounded-md text-[14px]">Dashboard</li>
                <li className="Dashboard-page3 p-[10px] rounded-md text-[14px]">Dashboard</li>
                <li className="Dashboard-page4 p-[10px] rounded-md text-[14px]">Dashboard</li>
            </ul>
            <div className="Dashboard-searchbar flex items-center space-x-4 ml-auto rounded-md rounded-r-md bg-gray-200">
                <FiSearch className="relative left-3 text-gray-600" size={20} />
                <input placeholder="Search Anything..." className="border-0 focus:outline-none focus:ring-0 md bg-gray-200 rounded-md"></input>
            </div>
            <div className="Dashboard-mails flex flex-row items-center "><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
            <div className="Dashboard-notifications flex flex-row items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg></div>
            {/* <div className="Dashboard-dp flex items-center mr-[20px]"><img src={dp} className="h-[30px] w-[30px] rounded-b-full rounded-t-full bg-black"></img><MdKeyboardArrowDown size={16} className="text-gray-600" /></div> */}
            <div className=" rounded-lg mb-auto flex flex-col justify-end ">
      {/* Header */}
      <button
        className="w-full flex items-center pt-4 justify-start rounded-lg border-0 space-x-[10px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={dp} className="h-[30px] w-[30px] rounded-b-full rounded-t-full bg-black"></img>
        <FiChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={24}
        />
      </button>

      {/* Content (Expands Downward) */}
      <div
        className={`transition-all duration-300 mt-[14px] mr-[10px] rounded-b-lg bg-gray-200 ${
          isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="p-4 text-gray-700">
          <div className="mb-2">
           {"Profile"}
          </div>
          <div>
           {"Settings"}
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}

export default DashboardTopNavbar