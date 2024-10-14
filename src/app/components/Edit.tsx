"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

  
 interface EditProps {
    id: string;  
    subName: string; 
    grade: string;  
    credit: string; 
  }

  export default function Edit({ id, subName, grade, credit }: EditProps) {
      const [newName,setNewName] = useState(subName);
      const [newGrade,setNewGrade] = useState(grade);
      const [newCredit,setNewCredit] = useState(credit); 
      const [loading,setLoading] = useState("Update Subject")
      
        const onNameChange =   (event: React.ChangeEvent<HTMLInputElement>) =>{
               setNewName(event.target.value)
        }
        const onGradeChange =   (event: React.ChangeEvent<HTMLInputElement>) =>{
               setNewGrade(event.target.value)
        }
        const onCreditChange =   (event: React.ChangeEvent<HTMLInputElement>) =>{
              setNewCredit(event.target.value)
        }
       
        const router = useRouter();
        const handleUpdate = async () =>{
            setLoading("Updating...")
           try{
             const res = await fetch(`/api/editSubjects/${id}`,{
             method: "PUT",
             headers:{
                "Content-type": "application-json"
             },
             body: JSON.stringify({newName , newGrade ,newCredit})
           });
            if(!res.ok){
                throw new Error("Failed to Update");
            }
            router.back();
            setLoading("Update Subject");
           }
           catch(error){
            setLoading("Update Subject");
            console.log("Error Updating",error);
           }
        }
    return(
        <div className="h-screen  flex items-center justify-center">
        <div className=" border h-2/3 w-2/3 flex flex-col justify-center items-center">
        <form className="flex flex-col justify-center items-start w-3/4">
            <div className="flex flex-row justify-between items-center w-full mb-4">
                <p className="mb-1 text-lg font-bold text-gray-200 w-1/3">Subject</p>
                <input
                    className="border h-10 text-white rounded-md bg-transparent px-2 w-2/3"
                    placeholder="Subject Name"
                    value={newName}
                    onChange={onNameChange}
                />
            </div>

            <div className="flex flex-row justify-between items-center w-full mb-4">
                <p className="mb-1 text-lg font-bold text-gray-200 w-1/3">Grade</p>
                <input
                    className="border h-10 text-white rounded-md bg-transparent px-2 w-2/3"
                    placeholder="Grade"
                    value={newGrade}
                    onChange={onGradeChange}
                />
            </div>

            <div className="flex flex-row justify-between items-center w-full mb-4">
                <p className="mb-1 text-lg font-bold text-gray-200 w-1/3">Credits</p>
                <input
                    className="border h-10 text-white rounded-md bg-transparent px-2 w-2/3"
                    placeholder="Credits"
                    value={newCredit}
                    onChange={onCreditChange}
                />
            </div>
            <button 
            onClick={handleUpdate}
            className="mb-3 text-gray-900 bg-gradient-to-r w-3/4 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2">
                {loading}
            </button>
        </form>
       </div> 
       </div>
    )
}