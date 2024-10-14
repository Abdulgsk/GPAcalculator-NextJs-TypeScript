"use client"
import AddItems from "../components/AddItem";
import { useSearchParams } from "next/navigation";
import FetchSubjects from "../components/FetchSubject";
import { useRouter } from "next/navigation";

export default function Calculate() {
  const params = useSearchParams();
  const userId = params.get("userId");
  const router = useRouter();

  const handleResult = () => {
    router.push(`/result?userId=${userId}`)
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="h-2/3 flex flex-col justify-start item-center">
        <h1 className="text-2xl font-extrabold py-2 px-8 text-gray-300">
          Enter the details below to calculate the GPA
        </h1>
        <div className="flex flex-col justify-center items-center">
          <AddItems />
          <div className="w-full flex flex-row items-center justify-around font-semibold border-b-2 p-2 text-gray-100">
            <h2>Subject</h2>
            <h2>Grade</h2>
            <h2>Credits</h2>
            <h2>Update</h2>
            <h2>Delete</h2>
          </div>
          <div className="w-full">
            <FetchSubjects userId={userId} />
          </div>
          <button
                onClick={handleResult} 
                className="mb-3 mt-4 text-gray-900 bg-gradient-to-r w-3/4 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2">
                Result
            </button>
        </div>
      </div>
    </div>
  );
}