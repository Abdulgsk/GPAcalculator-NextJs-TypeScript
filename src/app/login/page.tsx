"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<string>("Login");

  const handleSubmit = async () => {
    if (name === "" || password === "") {
      alert("All fields required");
      return;
    } else {
      setLoading("Loading...");
      try {
        const res = await fetch("/api/login", { 
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ name, password }),
        });
        if (res.status === 404 || res.status === 401) {
          const data = await res.json();
          alert(data.message);
          setLoading("Login");
          return;
        }
        if (!res.ok) {
          throw new Error("Failed to add UserName");
        }
        const data = await res.json();
        router.push(`/UserName?name=${name}&userId=${data.userId}`);
      } catch (error) {
        console.log("Error loading User: ", error);
      }
    }
  };

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  
  const handlePasswordChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="p-2 w-1/3 border-2 border-gray-600 flex flex-col justify-center items-start">
        <h2 className="text-4xl font-extrabold py-2 px-8 text-gray-300">Enter Your Name</h2>
        <div className="py-2 px-8 w-full">
          <input 
            className="border h-10 text-white rounded-md bg-transparent px-2"
            placeholder="My Name"
            type="text"
            onChange={handleInputChange}
          />
        </div>
        <h2 className="text-4xl font-extrabold py-2 px-8 text-gray-300">Password</h2>
        <div className="py-2 px-8 w-full">
          <input 
            className="border h-10 text-white rounded-md bg-transparent px-2"
            placeholder="Password"
            type="password"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex flex-row justify-center item-center mt-16 w-full">
          <button 
            className="text-gray-900 bg-gradient-to-r w-3/4 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleSubmit}
          >
            {loading}
          </button>
        </div>
        <p className="text-gray-100 p-3">
  Don't have an account? <span>
    <Link className="text-blue-300 hover:underline" href={'/'}> Register&apos;</Link>
  </span>
</p>
      </div>
    </div>
  );
}
