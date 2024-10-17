"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { HiPencil } from "react-icons/hi2";
import Remove from "./Remove";
import useSubjectStore from '../store/subjectStore';


interface Subject {
  _id: string;
  subName: string;
  grade: string;
  credit: number;
}



const FetchSubjects = ({ semId , onSubjectCountChange}: { semId: string | null, onSubjectCountChange: (count: number) => void }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const { deletionCount, additionCount } = useSubjectStore();

  const getSubjects = async (semId: string | null): Promise<Subject[]> => {
    if (!semId) return [];
    try {
      const res = await fetch(`/api/getSubjects/${encodeURIComponent(semId)}`, {
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
      const fetchedSubjects = await getSubjects(semId);
      setSubjects(fetchedSubjects);
      onSubjectCountChange(fetchedSubjects.length);
      setLoading(false);
    };

    fetchData();
  }, [semId, deletionCount, additionCount]);

  if (loading) {
    return <div className="w-full flex justify-center items-center text-gray-300 font-medium p-2">Loading...</div>;
  }

  return (
    <div className="w-full mt-4">
      {/* Header Row */}
      <div className="flex flex-row items-center justify-between font-semibold border-b-2 border-gray-600 bg-gray-800 text-gray-200 p-2">
        <h2 className="w-1/5 text-center">Subject</h2>
        <h2 className="w-1/5 text-center">Grade</h2>
        <h2 className="w-1/5 text-center">Credits</h2>
        <h2 className="w-1/5 text-center">Update</h2>
        <h2 className="w-1/5 text-center">Delete</h2>
      </div>

      {/* Subjects List */}
      {subjects.length === 0 ? (
        <div className="w-full flex justify-center items-center text-gray-300 font-medium p-2 mt-2">No subjects found.</div>
      ) : (
        subjects.map((subject) => (
          <div key={subject._id} className="flex flex-row items-center justify-between font-semibold border-b border-gray-700 p-2 text-gray-400 bg-gray-900 hover:bg-gray-800 transition duration-300">
            <h2 className="w-1/5 text-center">{subject.subName}</h2>
            <h2 className="w-1/5 text-center">{subject.grade}</h2>
            <h2 className="w-1/5 text-center">{subject.credit}</h2>
            <Link className="w-1/5 flex justify-center items-center" href={`/Update?subId=${subject._id}`}>
              <HiPencil className="text-gray-300 hover:text-blue-400 transition duration-200" />
            </Link>
            <button className="w-1/5 flex justify-center items-center">
              <Remove subId={subject._id} />
            </button>
          </div>
        ))
      )}
           
    </div>
  );
};

export default FetchSubjects;
