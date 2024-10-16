"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Home() {
   const router = useRouter();

   const [name, setName] = useState<string>("")
   const [password, setPassword] = useState<string>("")
   const [loading, setLoading] = useState<string>("Register");

   const handleSubmit = async () => {
      if (name === "" || password === "") {
         alert("All fields required");
         return;
      } else {
         setLoading("Loading...");
         try {
            const res = await fetch("/api/userName", {
               method: "POST",
               headers: {
                  "Content-type": "application/json"
               },
               body: JSON.stringify({ name, password })
            });
            if (res.status === 409) {
               const data = await res.json();
               alert(data.message);
               setLoading("Register");
               return;
            }
            if (!res.ok) {
               throw new Error('Failed to add UserName');
            }
            const data = await res.json();
            router.push(`/UserName?name=${encodeURIComponent(name)}&userId=${encodeURIComponent(data.userId)}`)
         } catch (error) {
            console.log("Error loading User: ", error)
         }
      }
   };
   const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
   }
   const handlePasswordChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
   }

   return (
      <div className="h-screen w-screen flex justify-center items-center px-4">
         <div className="p-6 w-full max-w-md border-2 border-gray-600 rounded-lg bg-gray-800 flex flex-col justify-center items-start">
            <h2 className="text-3xl font-extrabold py-2 text-gray-300">Enter Your Name</h2>
            <div className="py-2 w-full">
               <input
                  className="w-full border h-12 text-white rounded-md bg-transparent px-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
                  placeholder="My Name"
                  type="text"
                  onChange={handleInputChange}
               />
            </div>
            <h2 className="text-3xl font-extrabold py-2 text-gray-300">Password</h2>
            <div className="py-2 w-full">
               <input
                  className="w-full border h-12 text-white rounded-md bg-transparent px-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
                  placeholder="Password"
                  type="password"
                  onChange={handlePasswordChange}
               />
            </div>
            <div className="flex justify-center mt-12 w-full">
               <button
                  className="w-full max-w-xs text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-3 text-center"
                  onClick={handleSubmit}
               >
                  {loading}
               </button>
            </div>
            <p className="text-gray-100 text-center mt-4 w-full">Already have an account? <span><Link className="text-blue-300 hover:underline" href={'/login'}>Login</Link></span></p>
         </div>
      </div>
   )
}
