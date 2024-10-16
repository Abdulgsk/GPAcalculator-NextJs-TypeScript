"use client";
import AddItems from "../components/AddItem";
import { useSearchParams } from "next/navigation";
import FetchSubjects from "../components/FetchSubject";
import { useRouter } from "next/navigation";

export default function Calculate() {
  const params = useSearchParams();
  const userId = params.get("userId");
  const router = useRouter();

  const handleResult = () => {
    router.push(`/result?userId=${userId}`);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-graycustom to-black px-4">
      <div className="w-full max-w-3xl h-4/5 flex flex-col justify-start items-center bg-gray-900 bg-opacity-90 rounded-lg p-4 md:p-8 border border-gray-600">
        <h1 className="text-lg md:text-2xl font-extrabold py-2 px-4 md:px-8 text-gray-300 text-center">
          Enter the details below to calculate the GPA
        </h1>
        <div className="w-full flex flex-col justify-center items-center mt-4">
          <AddItems />
          <div className="w-full flex flex-row items-center justify-between font-semibold border-b-2 p-2 text-gray-100">
            <h2 className="text-sm md:text-base">Subject</h2>
            <h2 className="text-sm md:text-base">Grade</h2>
            <h2 className="text-sm md:text-base">Credits</h2>
            <h2 className="text-sm md:text-base">Update</h2>
            <h2 className="text-sm md:text-base">Delete</h2>
          </div>
          <div className="w-full mt-2">
            <FetchSubjects userId={userId} />
          </div>
          <button
            onClick={handleResult}
            className="mt-6 w-full md:w-1/2 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center"
          >
            Result
          </button>
        </div>
      </div>
    </div>
  );
}
