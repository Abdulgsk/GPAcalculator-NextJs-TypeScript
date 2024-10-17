"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditProps {
  id: string;  
  title: string;  
}

export default function Edit({ id, title }: EditProps) {
  const [newName, setNewName] = useState(title);
  const [loading, setLoading] = useState("Update Title");

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };



  const router = useRouter();

  const handleUpdate = async () => {
   
    setLoading("Updating...");

    if (newName=== "" ) {
        alert("All fields must be filled out");
        setLoading("Update Title");
        return;
    }
   
    try {
      const res = await fetch(`/api/editSemster/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newName }),
      });
      if (!res.ok) {
        throw new Error("Failed to Update");
      }
      router.back();
      setLoading("Update Title");
    } catch (error) {
      setLoading("Update Title");
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
