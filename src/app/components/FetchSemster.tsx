"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { HiPencil } from "react-icons/hi2";
import Remove from "./RemoveSem";
import useSubjectStore from '../store/subjectStore';
import { useRouter } from 'next/navigation';


interface Semster {
  _id: string;
  title : string;
  result : number;
}



const FetchSemster = ({ userId }: { userId: string | null }) => {
  const [semsters, setSemsters] = useState<Semster[]>([]);
  const [loading, setLoading] = useState(true);
  const { deletionCount, additionCount } = useSubjectStore();
  const router = useRouter();
  
  const getSubjects = async (userId: string | null): Promise<Semster[]> => {
    if (!userId) return [];
    try {
      const res = await fetch(`/api/getSemsters/${encodeURIComponent(userId)}`, {
        cache: 'no-store',
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
  
      if (!res.ok) {
        console.log("Error in fetch subjects");
        return [];
      }
      const data = await res.json();
      return data || [];
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };
    
  useEffect(() => {
    const fetchData = async () => {
      const fetchedSubjects = await getSubjects(userId);
      setSemsters(fetchedSubjects);
      setLoading(false);
    };

    fetchData();
  }, [userId, deletionCount, additionCount]);

  if (loading) {
    return <div className="w-full flex justify-center items-center text-gray-300 font-medium p-2">Loading...</div>;
  }

  return (
    <div className="w-full mt-4">
      {/* Header Row */}
      <div className="flex flex-row items-center justify-between font-semibold border-b-2 border-gray-600 bg-gray-800 text-gray-200 p-2">
        <h2 className="w-1/4 text-center">Title</h2>
        <h2 className="w-1/4 text-center">Result</h2>
        <h2 className="w-1/4 text-center">Update</h2>
        <h2 className="w-1/4 text-center">Delete</h2>
      </div>

      {/* Subjects List */}
      {semsters.length === 0 ? (
        <div className="w-full flex justify-center items-center text-gray-300 font-medium p-2 mt-2">No Titles found.</div>
      ) : (
        semsters.map((semster) => (
          <div key={semster._id} className="flex flex-row items-center justify-between font-semibold border-b border-gray-700 p-2 text-gray-400 bg-gray-900 hover:bg-gray-800 transition duration-300">
            <h2 onClick={()=> router.push(`/main?semId=${semster._id}&userId=${userId}`)} className="w-1/4 text-center">{semster.title}</h2>
            <h2 className="w-1/4 text-center">{semster.result === 0 ? "-": semster.result}</h2>
            <Link className="w-1/4 flex justify-center items-center" href={`/UpdateSem?semId=${semster._id}`}>
              <HiPencil className="text-gray-300 hover:text-blue-400 transition duration-200" />
            </Link>
            <button className="w-1/4 flex justify-center items-center">
              <Remove semId={semster._id} />
            </button>
          </div>
        ))
      )}
           
    </div>
  );
};

export default FetchSemster;
