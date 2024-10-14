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

const FetchSubjects = ({ userId }: { userId: string | null }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const { deletionCount, additionCount } = useSubjectStore();

  const getSubjects = async (userId: string | null): Promise<Subject[]> => {
    if (!userId) return [];
    try {
      const res = await fetch(`/api/getSubjects?userId=${encodeURIComponent(userId)}`, {
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
      console.log(data, "this is the data");
      return data || [];
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSubjects = await getSubjects(userId);
      setSubjects(fetchedSubjects);
      setLoading(false);
    };

    fetchData();
  }, [userId, deletionCount, additionCount]); // Add additionCount to the dependency array

  if (loading) {
    return <div className="w-full flex justify-center items-center text-gray-300 font-medium p-2">Loading...</div>;
  }

  return (
    <div>
      {subjects.length === 0 ? (
        <div className="w-full flex justify-center items-center text-gray-300 font-medium p-2">No subjects found.</div>
      ) : (
        subjects.map((subject) => (
          <div key={subject._id} className="w-full flex flex-row items-center justify-around font-semibold border-b-gray-700 border-b p-2 text-gray-400">
            <h2 className="w-1/5 flex justify-center items-center">{subject.subName}</h2>
            <h2 className="w-1/5 flex justify-center items-center ">{subject.grade}</h2>
            <h2 className="w-1/5 flex justify-center items-center">{subject.credit}</h2>
            <Link className="w-1/5 flex justify-center items-center" href={`/Update/${subject._id}`}><HiPencil /></Link>
            <button className="w-1/5 flex justify-center items-center"><Remove subId={subject._id} userId={userId}/></button>
          </div>
        ))
      )}
    </div>
  );
};

export default FetchSubjects;