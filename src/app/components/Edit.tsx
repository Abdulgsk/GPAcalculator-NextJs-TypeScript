"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditProps {
  id: string;  
  subName: string; 
  grade: string;  
  credit: number; 
}

export default function Edit({ id, subName, grade, credit }: EditProps) {
  const [newName, setNewName] = useState(subName);
  const [newGrade, setNewGrade] = useState(grade);
  const [newCredit, setNewCredit] = useState(credit); 
  const [loading, setLoading] = useState("Update Subject");

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const onGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewGrade(event.target.value);
  };

  const onCreditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCredit(Number(event.target.value));
  };

  const router = useRouter();

  const handleUpdate = async () => {
    setLoading("Updating...");
    try {
      const res = await fetch(`/api/editSubjects/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newName, newGrade, newCredit }),
      });
      if (!res.ok) {
        throw new Error("Failed to Update");
      }
      router.back();
      setLoading("Update Subject");
    } catch (error) {
      setLoading("Update Subject");
      console.log("Error Updating", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-graycustom to-black px-4">
      <div className="border h-3/4 w-full max-w-md flex flex-col justify-center items-center bg-gray-900 bg-opacity-90 rounded-lg p-4 md:p-8">
        <form className="flex flex-col justify-center items-start w-full">
          <div className="flex flex-col mb-4 w-full">
            <label className="mb-1 text-lg font-bold text-gray-200">Subject</label>
            <input
              className="border h-10 text-white rounded-md bg-transparent px-2"
              placeholder="Subject Name"
              value={newName}
              onChange={onNameChange}
            />
          </div>

          <div className="flex flex-col mb-4 w-full">
            <label className="mb-1 text-lg font-bold text-gray-200">Grade</label>
            <input
              className="border h-10 text-white rounded-md bg-transparent px-2"
              placeholder="Grade"
              value={newGrade}
              onChange={onGradeChange}
            />
          </div>

          <div className="flex flex-col mb-4 w-full">
            <label className="mb-1 text-lg font-bold text-gray-200">Credits</label>
            <input
              className="border h-10 text-white rounded-md bg-transparent px-2"
              placeholder="Credits"
              value={newCredit}
              onChange={onCreditChange}
            />
          </div>

          <button 
            type="button"
            onClick={handleUpdate}
            className="mb-3 text-gray-900 bg-gradient-to-r w-full from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center"
          >
            {loading}
          </button>
        </form>
      </div> 
    </div>
  );
}
