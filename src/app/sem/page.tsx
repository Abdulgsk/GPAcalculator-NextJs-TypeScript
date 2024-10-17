"use client";
import AddItems from "../components/AddSemster";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import FetchSemster from "../components/FetchSemster";
import { FaInfoCircle } from "react-icons/fa";


export default function Calculate() {
  const params = useSearchParams();
  const userId = params.get("userId");



  const [tooltipVisible, setTooltipVisible] = useState(false);



  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-graycustom to-black px-4">
      <div className="relative w-full max-w-3xl flex flex-col justify-start items-center bg-gray-900 bg-opacity-90 rounded-lg p-4 md:p-8 border border-gray-600 overflow-auto">
      <div className="absolute top-4 right-4">
          <div 
            className="cursor-pointer text-gray-300"
            onMouseEnter={() => setTooltipVisible(true)} 
            onMouseLeave={() => setTooltipVisible(false)} 
          >
            <FaInfoCircle  size={24} />
          </div>
          {tooltipVisible && (
            <div className="absolute right-0 mt-1 w-48 bg-gray-800 text-white text-sm rounded-md p-2 shadow-lg">
              <p className="font-semibold">Note:</p>
              <ul className="list-inside">
                <li>Click on titles for further calculation</li>
              </ul>
            </div>
          )}
        </div>
        <h1 className="text-lg md:text-2xl font-extrabold py-2 px-4 md:px-8 text-gray-300 text-center">
          Enter the Title for your semster
        </h1>
        <div className="w-full flex flex-col justify-center items-center mt-4">
          <AddItems/>
          
          <div className="w-full mt-2 overflow-auto">
            <FetchSemster userId={userId}  />
          </div>
        </div>
      </div>
    </div>
  );
}
