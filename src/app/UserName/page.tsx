"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation";


export default function UserName() {

    const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const userId = searchParams.get("userId");
   return(
      <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-3/6 w-1/3 border-2 border-gray-600 flex flex-col justify-center items-start">
          <h2 className="text-4xl font-extrabold py-2 px-8 text-gray-300">Hello {name || "Guest"}</h2> 
         <p className="mb-4 text-lg font-normal text-gray-400 px-8">
            Click below to calculate your GPA...
         </p>
         <div className="flex flex-row justify-start ml-12 w-2/3">
         <Link className="text-gray-900 bg-gradient-to-r w-3/4 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2" 
         href={`/main?userId=${userId}`}>Start</Link>
         </div>
      </div>
      </div>
   )
}

