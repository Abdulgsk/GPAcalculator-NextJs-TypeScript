"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Subject {
  _id: string;
  subName: string;
  grade: string;
  credit: number;
}

function SubjectsContent() {
  const params = useSearchParams();
  const userId = params.get("userId");

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState(""); 
  const [result, setResult] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch user name based on userId
  const getUserName = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`/api/GetUser/${encodeURIComponent(userId)}`, {
        cache: 'no-store',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.log("Error in fetching user name");
        return;
      }

      const data = await res.json();
      setName(data.name || "User");
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  const getSubjects = async (): Promise<Subject[]> => {
    if (!userId) return [];
    try {
      const res = await fetch(`/api/getSubjects/${encodeURIComponent(userId)}`, {
        cache: 'no-store',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.log("Error in fetching subjects");
        return [];
      }
      const data = await res.json();
      return data || [];
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  const handleSumCredits = () => {
    return subjects.reduce((sum, subject) => sum + subject.credit, 0);
  };

  const handleGradeSum = () => {
    let sum = 0;
    const gradePoints: { [key: string]: number } = {
      'o': 10,
      'a+': 9,
      'a': 8,
      'b+': 7,
      'b': 6,
      'c+': 5,
      'c': 4,
    };

    subjects.forEach((subject) => {
      const grade = subject.grade.toLowerCase();
      if (grade in gradePoints) {
        sum += gradePoints[grade] * subject.credit;
      } else {
        console.warn(`Unknown grade: ${subject.grade}`);
      }
    });

    return sum;
  };

  const handleGpa = async () => {
    setLoading(true); 

    const fetchedSubjects = await getSubjects();
    setSubjects(fetchedSubjects);

    const totalCredits = handleSumCredits();
    const gradeSum = handleGradeSum();
    
    if (totalCredits > 0) {
      const calculatedGpa = parseFloat((gradeSum / totalCredits).toFixed(2));
      setResult(calculatedGpa);

      await handleStoreGpa(calculatedGpa);
      setLoading(false);
      return calculatedGpa;
    }
    setLoading(false);
    return 0;
  };

  const handleStoreGpa = async (gpa: number) => {
    try {
      const res = await fetch("/api/StoreResult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ result: gpa, userId }),
      });
      if (!res.ok) {
        throw new Error('Failed to store GPA');
      }
    } catch (error) {
      console.log("Error storing GPA", error);
    }
  };

  // Fetch user name when component mounts
  useEffect(() => {
    getUserName();
  }, [userId]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-graycustom to-black px-4">
      <div className="border h-3/6 w-full max-w-md flex flex-col justify-center items-start bg-gray-900 bg-opacity-90 rounded-lg p-4">
        <h2 className="text-3xl font-extrabold py-2 px-8 text-gray-300">Congrats {name}</h2>
        <p className="mb-4 text-lg font-normal text-gray-400 px-8">
          Your Calculated GPA is...
        </p>
        <div className="flex flex-row justify-start ml-12 w-2/3">
          <button
            onClick={handleGpa}
            className="text-gray-900 font-semibold bg-gradient-to-r w-3/4 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Generate"}
          </button>
        </div>
        <div className="text-3xl font-bold text-green-300 ml-12 p-2">
          {result ? `GPA: ${result}` : ""}
        </div>
      </div>
    </div>
  );
}

const FetchSubjects = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen text-gray-300">Loading...</div>}>
      <SubjectsContent />
    </Suspense>
  );
};

export default FetchSubjects;
