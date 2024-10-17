"use client";
import AddItems from "../components/AddItem";
import { useSearchParams } from "next/navigation";
import FetchSubjects from "../components/FetchSubject";
import { FaInfoCircle } from 'react-icons/fa';
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Calculate() {
  const params = useSearchParams();
  const semId = params.get("semId");
  const userId = params.get("userId");
  const router = useRouter();

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [subjectCount, setSubjectCount] = useState(0);


  const handleResult = () => {
    if (subjectCount === 0) {
      alert("Please add subjects before proceeding to the result.");
      return;
    }
    router.push(`/result?userId=${userId}&semId=${semId}`);
  };


  

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
              <p className="font-semibold">Instructions:</p>
              <ul className="list-disc list-inside">
                <li>Grades can be in any case (e.g., A, a, B, b).</li>
                <li>Use the &ldquo;+&ldquo; symbol if needed (e.g., A+).</li>
                <li>Credits must be greater than 1 and less than 4.</li>
                <li>No fields should be left empty.</li>
                <li>For institutions who does&apos;nt prefer c+ as a grade please consider c+ as c and ommit c</li>
              </ul>
            </div>
          )}
        </div>
        <h1 className="text-lg md:text-2xl font-extrabold py-2 px-4 md:px-8 text-gray-300 text-center">
          Enter the details below to calculate the GPA
        </h1>
        <div className="w-full flex flex-col justify-center items-center mt-4">
          <AddItems />
          
          <div className="w-full mt-2 overflow-auto">
            <FetchSubjects semId={semId}   onSubjectCountChange={setSubjectCount} />
          </div>
        </div>
        <button
            onClick={handleResult}
            className="mt-6 w-full md:w-1/2 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center"
          >
            Result
          </button>
      </div>
    </div>
  );
}
