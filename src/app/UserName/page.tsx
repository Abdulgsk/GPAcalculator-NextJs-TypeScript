"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function UserNameContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const userId = searchParams.get("userId");

  return (
    <>
      <h2 className="text-2xl md:text-4xl font-extrabold py-2 px-4 md:px-8 text-gray-300">
        Hello {name || "Guest"}
      </h2>
      <p className="mb-4 text-base md:text-lg font-normal text-gray-400 px-4 md:px-8">
        Click below to calculate your GPA...
      </p>
      <div className="flex justify-center md:justify-start md:ml-12 w-full md:w-2/3 px-4 md:px-0">
        <Link
          className="text-gray-900 bg-gradient-to-r w-full md:w-3/4 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-4 md:mb-2"
          href={`/main?userId=${userId}`}
        >
          Start
        </Link>
      </div>
    </>
  );
}

export default function UserName() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-lg mx-auto border-2 border-gray-600 flex flex-col justify-center items-start p-4 md:p-8 bg-gray-800 rounded-lg">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center h-64 w-full">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-white rounded-full animate-bounce" />
              <div className="w-5 h-5 bg-white rounded-full animate-bounce delay-1000" />
              <div className="w-5 h-5 bg-white rounded-full animate-bounce delay-700" />
            </div>
            <p className="mt-4 text-white text-2xl font-semibold px-2">Loading...</p>
          </div>
        }>
          <UserNameContent />
        </Suspense>
      </div>
    </div>
  );
}