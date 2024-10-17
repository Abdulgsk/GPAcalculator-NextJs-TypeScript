"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Edit from "@/app/components/EditSemster";

const getTopicById = async (semId: string) => {
  try {
    const res = await fetch(`/api/getEditSemster/${encodeURIComponent(semId)}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Title not found");
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching the subject", error, semId);
    throw error;
  }
};

export default function Update() {
  const params = useSearchParams();
  const semId = params.get("semId");
  const [subjectData, setSubjectData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!semId) {
      setError("No ID provided");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getTopicById(semId);
        if (!data || !data.semster) {
          throw new Error("Title data is missing");
        }
        setSubjectData(data.semster);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, [semId]);

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center text-red-700">
        <h1>Error: {error}</h1>
      </div>
    );
  }

  if (!subjectData) {
    return(
       <div className="flex items-center justify-center h-screen bg-gradient-to-r from-graycustom to-black">
      <div className="flex items-center space-x-2  mt-5 h-100" >
      <div className="w-5 h-5 bg-white rounded-full animate-bounce" />
      <div className="w-5 h-5 bg-white rounded-full animate-bounce delay-1000" />
      <div className="w-5 h-5 bg-white rounded-full animate-bounce delay-700" />
    </div>
    <p className="mt-4 text-white text-2xl px-2 font-semibold">Loading...</p>
  </div>
  );
  }

  const { title } = subjectData;

  return <Edit id={semId!} title={title} />;
}
